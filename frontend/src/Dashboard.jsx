import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

const TIME_SLOTS = (() => {
  const slots = [];
  const start = 9 * 60 + 30;
  const end = 18 * 60;
  for (let m = start; m <= end; m += 30) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    slots.push(`${h}:${mm}`);
  }
  return slots;
})();

export default function Dashboard() {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/barbers")
      .then((res) => res.json())
      .then((data) => setBarbers(data))
      .catch((err) => console.error("Errore barbieri:", err));
  }, []);

  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetch(
      `http://localhost:5050/api/appointments?barber_id=${selectedBarber}&date=${formattedDate}`
    )
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments))
      .catch((err) => console.error("Errore appuntamenti:", err));
  }, [selectedBarber, selectedDate]);

  const getAppointmentAtTime = (time) =>
    appointments.find((a) => a.time.startsWith(time));

  // Variants per griglia slot
  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.18
      }
    }
  };

  const slotVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: [0.4,0,0.2,1] } }
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-16 px-2 md:px-6 text-zinc-900">
      <motion.div
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-0 md:p-10 border border-neutral-200"
        initial={{ opacity: 0, y: 38 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-zinc-800 text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.52 }}
        >
          Gestione Prenotazioni
        </motion.h1>
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.52 }}
        >
          <select
            onChange={(e) => setSelectedBarber(e.target.value)}
            className="px-6 py-3 rounded-xl bg-zinc-100 border border-neutral-300 text-zinc-900 text-center font-medium focus:outline-none focus:ring-2 focus:ring-zinc-300"
            value={selectedBarber}
          >
            <option value="">Seleziona barbiere</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.name}
              </option>
            ))}
          </select>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="px-6 py-3 rounded-xl shadow bg-zinc-100 border border-neutral-300 text-zinc-900 text-center font-medium focus:outline-none focus:ring-2 focus:ring-zinc-300"
            placeholderText="Scegli una data"
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
          />
        </motion.div>

        <AnimatePresence>
          {selectedBarber && selectedDate && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
            >
              <motion.h2
                className="text-xl md:text-2xl font-semibold text-zinc-700 mb-6 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Orari per il {selectedDate.toLocaleDateString("it-IT")}
              </motion.h2>
              <motion.ul className="grid grid-cols-1 gap-3 md:gap-4">
                {TIME_SLOTS.map((time, i) => {
                  const appointment = getAppointmentAtTime(time);
                  return (
                    <motion.li
                      key={time}
                      variants={slotVariants}
                      className={`px-6 py-4 rounded-xl border flex justify-between items-center text-base md:text-lg font-medium transition-all duration-300
                        ${appointment
                          ? "bg-gradient-to-r from-rose-100 via-red-100/50 to-white border-rose-200 text-rose-700 shadow-[0_1px_8px_-2px_rgba(240,62,60,0.09)] animate-appointment-glow"
                          : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-200"}
                      `}
                    >
                      <span className="font-mono tracking-wide">{time}</span>
                      {appointment ? (
                        <div className="text-right">
                          <span className="font-semibold">{appointment.client_name}</span>
                          <p className="text-sm text-zinc-400">{appointment.client_phone}</p>
                        </div>
                      ) : (
                        <span className="italic text-sm text-zinc-500">Disponibile</span>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
              <style>{`
                @keyframes appointment-glow {
                  0%,100% { box-shadow: 0 0px 0px 0 rgba(240,62,60,0.0);}
                  60% { box-shadow: 0 2px 16px 0 rgba(240,62,60,0.16);}
                }
                .animate-appointment-glow {
                  animation: appointment-glow 1.9s cubic-bezier(.4,0,.2,1) infinite;
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}