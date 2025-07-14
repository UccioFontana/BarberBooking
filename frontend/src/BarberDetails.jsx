import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';

import { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
registerLocale('it', it);

const STANDARD_SLOTS = (() => {
  const slots = [];
  const start = 9 * 60;
  const end = 18 * 60;
  for (let m = start; m <= end; m += 30) {
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    slots.push(`${h}:${mm}`);
  }
  return slots;
})();

function BarberDetail() {
  const { id } = useParams();
  const [barber, setBarber] = useState(null);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Fetch barber data
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5050/api/barbers/${id}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(data => setBarber(data.barber))
      .catch(() => setError('Impossibile caricare il barbiere'))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    fetch(`http://localhost:5050/api/appointments?barber_id=${id}&date=${formattedDate}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(data => {
        const bookedSlots = data.appointments.map(a => a.time.slice(0, 5));
        setBooked(bookedSlots);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedDate, id]);

  const handleSlotClick = (time) => {
    if (!booked.includes(time)) {
      setSelectedTime(time);
      setShowModal(true);
      setBookingError(null);
      setClientName('');
      setClientPhone('');
    }
  };

  const handleBooking = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      setBookingError('Per favore, inserisci nome e telefono.');
      return;
    }
    setBookingLoading(true);
    setBookingError(null);

    const payload = {
      barber_id: id,
      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
      time: selectedTime,
      client_name: clientName.trim(),
      client_phone: clientPhone.trim(),
    };

    fetch('http://localhost:5050/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore ${res.status}`);
        return res.json();
      })
      .then(() => {
        setBooked([...booked, selectedTime]);
        setShowModal(false);
        setClientName('');
        setClientPhone('');
      })
      .catch(() => {
        setBookingError('Errore durante la prenotazione. Riprova.');
      })
      .finally(() => setBookingLoading(false));
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-16 px-2 md:px-6 text-zinc-900">
      <motion.div
        className="max-w-5xl mx-auto bg-white/80 shadow-2xl rounded-3xl p-0 md:p-10 border border-neutral-200"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {loading && <p className="text-center text-neutral-400 animate-pulse py-16">Caricamento…</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}
        {barber && (
          <>
            {/* HERO Barber */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-14 px-8 pt-12 pb-4">
              {/* Foto con effetti */}
              <motion.div
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-[5px] border-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.93, rotate: 8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
                style={{
                  boxShadow: '0 8px 32px 0 rgba(30,30,35,0.13), 0 1.5px 6px 0 rgba(80,80,100,0.08)'
                }}
              >
                <img src={barber.photo} alt={barber.name} className="w-full h-full object-cover" />
                {/* Highlight Apple */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.21 }}
                  style={{
                    background: 'radial-gradient(ellipse 70% 40% at 50% 70%, #f2f5fa88 0%, #fff0 100%)'
                  }}
                  transition={{ duration: 1.3, delay: 0.7 }}
                />
              </motion.div>
              {/* Info */}
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-2">
                  {barber.name}
                </h1>
                <p className="text-neutral-500 text-lg font-normal">
                  Prenota il tuo nuovo look <span role="img" aria-label="crown">👑</span>
                </p>
              </motion.div>
            </div>

            {/* Date picker */}
            <motion.div
              className="mb-10 flex justify-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                className="px-6 py-3 rounded-xl shadow bg-white border border-neutral-300 text-zinc-900 text-center font-medium focus:ring-2 focus:ring-zinc-300 focus:outline-none transition-all"
                placeholderText="Scegli una data"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                locale="it"
              />
            </motion.div>

            {/* Orari disponibili */}
            <AnimatePresence>
              {selectedDate && (
                <motion.section
                  key="slots"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } }
                  }}
                >
                  <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-zinc-700 mb-6 text-center"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Orari per il {selectedDate.toLocaleDateString('it-IT')}
                  </motion.h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
                    {STANDARD_SLOTS.map((time, i) => {
                      const busy = booked.includes(time);
                      return (
                        <motion.li
                          key={time}
                          onClick={() => handleSlotClick(time)}
                          initial={{ opacity: 0, y: 22, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 18 }}
                          transition={{ duration: 0.38, delay: i * 0.017 }}
                          className={`py-3 rounded-xl border text-center font-medium text-lg cursor-pointer select-none transition-all duration-300
                            ${busy
                              ? 'bg-neutral-200 border-neutral-300 text-neutral-400 line-through cursor-not-allowed'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white'}
                          `}
                          tabIndex={busy ? -1 : 0}
                          aria-disabled={busy}
                        >
                          {time}
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.section>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      {/* MODAL: spotlight+fade */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4,0,0.2,1] }}
          >
            {/* Background blur + spotlight */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-[3.5px]"
              style={{
                background: `radial-gradient(ellipse 60% 45% at 60% 60%, rgba(255,255,255,0.10), rgba(0,0,0,0.60) 85%)`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            {/* Modal card */}
            <motion.div
              className="relative bg-white border border-zinc-200 p-7 rounded-2xl shadow-2xl w-full max-w-md z-10"
              initial={{ scale: 0.95, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 160, damping: 19, duration: 0.33 }}
            >
              <h2 className="text-2xl font-semibold text-zinc-900 mb-3">Conferma prenotazione</h2>
              <p className="mb-5 text-zinc-600 text-base font-normal">
                {selectedDate?.toLocaleDateString('it-IT')} alle <span className="font-medium">{selectedTime}</span>
              </p>
              <input
                type="text"
                placeholder="Nome"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full mb-3 px-4 py-2 rounded-lg bg-zinc-100 border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                disabled={bookingLoading}
              />
              <input
                type="text"
                placeholder="Telefono"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full mb-6 px-4 py-2 rounded-lg bg-zinc-100 border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                disabled={bookingLoading}
              />
              {bookingError && <p className="mb-4 text-red-500 text-sm">{bookingError}</p>}
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={bookingLoading}
                  className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-medium transition disabled:opacity-50"
                  type="button"
                >
                  Annulla
                </button>
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition
                    ${bookingLoading ? 'bg-zinc-400 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                  type="button"
                >
                  {bookingLoading ? 'Prenotazione...' : 'Conferma'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BarberDetail;