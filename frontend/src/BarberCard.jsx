import { motion } from 'framer-motion';

export default function BarberCard({ name, photo, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.90, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover="hovered"
      className={`relative flex flex-col items-center group ${className}`}
      style={{ perspective: 800 }}
    >
      <motion.img
        src={photo}
        alt={name}
        draggable={false}
        className="
          w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[2.5px] border-neutral-200 object-cover shadow-[0_3px_16px_0_rgba(30,30,35,0.12)] bg-neutral-50
          group-hover:scale-[1.045] transition-transform duration-300
        "
        style={{ zIndex: 1 }}
        whileHover={{ scale: 1.045 }}
      />
      {/* Overlay glossy effetto Apple */}
      <motion.div
        variants={{
          hovered: { opacity: 1 },
          initial: { opacity: 0 }
        }}
        initial="initial"
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-full overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* effetto glossy */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(120deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.04) 100%)'
          }}
          animate={{ opacity: [0, 1, 0.9, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
        />
        {/* highlight ring */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full rounded-full border-2 border-white/70 shadow-[0_0_18px_1px_rgba(80,80,80,0.14)]"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.7, repeat: Infinity, repeatType: "reverse", delay: 0.9 }}
        />
      </motion.div>
      {/* Icona elegante in basso a destra, animata */}
      <motion.div
        className="absolute bottom-2 right-3 w-7 h-7 flex items-center justify-center bg-white/85 shadow-lg rounded-full border border-neutral-100 group-hover:scale-110 transition-transform"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        {/* Forbici SVG minimal - puoi sostituire */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10.2" stroke="#e5e7eb" strokeWidth="1.6" />
          <path d="M6 12L16 6M6 10L16 16" stroke="#18181b" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </motion.div>
      {/* Nome (invisibile qui ma puoi aggiungerlo sotto con la stessa animazione) */}
    </motion.div>
  )
}