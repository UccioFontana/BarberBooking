import { useEffect, useState } from 'react';
import BarberCard from './BarberCard';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

/**
 * HOME PAGE - APPLE WOW EFFECT
 * - Headline con animazione "letter-by-letter"
 * - Card reveal sequenziale su scroll
 * - Ultra-minimal, solo palette neutra
 */
const headline = 'Barbieri Disponibili';

function Home() {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();
  const controls = useAnimation();

  // Letter animation: crea array di lettere per headline
  const letters = headline.split('');

  useEffect(() => {
    fetch('http://localhost:5050/api/barbers')
      .then(res => res.json())
      .then(data => setBarbers(data))
      .catch(err => console.error('❌ Errore fetch:', err));
    // Start animation all'entrata
    controls.start('visible');
  }, []);

  // Variants per Framer Motion
  const letterVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.06 * i,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };

  const cardContainerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.3,
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.4,0,0.2,1] } }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 font-sans text-zinc-900 antialiased transition-colors duration-700">
      {/* Navbar Apple-like */}
      <nav className="sticky top-0 w-full z-30 bg-white/80 backdrop-blur-[6px] border-b border-neutral-200 flex items-center px-8 py-3 h-16 shadow-none transition-all duration-500">
        <span className="font-semibold text-lg tracking-tight select-none">
          <span className="sr-only">Barbers</span>
          <svg width="36" height="36" fill="none" className="inline mr-2 -mt-1" aria-hidden="true">
            <circle cx="18" cy="18" r="18" fill="#191919"/>
            <path d="M24 11c-.2-1.6-1.2-2.7-2.5-2.7-1 0-1.6.7-2.5.7s-1.7-.7-2.7-.7C13 9.3 11.2 11.2 11.2 14.1c0 1.4.5 2.9 1.6 4.6.9 1.3 2.2 2.7 3.8 2.7h.1c.3 0 .6-.1.9-.2.2.1.5.2.8.2h.1c1.5 0 2.8-1.3 3.7-2.6 1.1-1.7 1.6-3.2 1.6-4.6z" fill="#fff"/>
          </svg>
          BarberShop
        </span>
      </nav>

      {/* Headline effetto "writing" */}
      <header className="pt-20 md:pt-32 pb-10 text-center max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900 leading-tight select-none"
          style={{ letterSpacing: '-.02em', lineHeight: 1.14 }}
          initial="hidden"
          animate={controls}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariant}
              initial="hidden"
              animate={controls}
              className={char === ' ' ? 'inline-block w-2 md:w-3' : 'inline-block'}
              aria-hidden="true"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-600 font-normal mb-2"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + 0.03 * letters.length, duration: 0.6, ease: [0.4,0,0.2,1] }}
        >
          Scegli il tuo barbiere preferito. Esperienza senza attrito, come piace a noi.
        </motion.p>
      </header>

      {/* Card grid effetto sequenziale */}
      <motion.main
        className="max-w-6xl mx-auto w-full grid gap-x-8 gap-y-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-2 md:px-6 pb-32"
        initial="hidden"
        animate="visible"
        variants={cardContainerVariant}
      >
        <AnimatePresence>
          {barbers.length === 0 && (
            <motion.p
              className="col-span-full text-center text-neutral-400 text-lg tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              Caricamento barbieri…
            </motion.p>
          )}

          {barbers.map((barber, idx) => (
            <motion.button
              key={barber.id}
              type="button"
              onClick={() => navigate(`/barbers/${barber.id}`)}
              tabIndex={0}
              aria-label={`Vai alla pagina del barbiere ${barber.name}`}
              variants={cardVariant}
              className="
                group relative flex flex-col items-center justify-start bg-white/90
                rounded-2xl shadow-apple-card transition-all duration-300
                hover:shadow-apple-card-hover focus:shadow-apple-card-hover
                border border-neutral-200 hover:border-neutral-400 focus:border-neutral-400
                overflow-hidden cursor-pointer outline-none ring-0
                px-8 py-8 md:py-10 min-h-[310px] hover:-translate-y-[4px]
                active:scale-[.99]
              "
              style={{ transitionProperty: 'box-shadow, transform, border-color, background' }}
            >
              <BarberCard
                name={barber.name}
                photo={barber.photo || 'https://placehold.co/200'}
                className="
                  w-28 h-28 md:w-32 md:h-32 rounded-full mb-6
                  shadow-inner border-2 border-neutral-100
                  transition-transform duration-300 group-hover:scale-105
                "
              />
              <span className="mt-0 text-lg md:text-xl font-semibold text-zinc-900 group-hover:text-black group-focus:text-black transition-colors duration-200">
                {barber.name}
              </span>
              <span className="
                block mt-3 w-6 h-[3px] bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 
                rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 
                transition-opacity duration-300
              " />
              <span className="absolute inset-0 pointer-events-none group-hover:bg-gradient-radial group-hover:from-neutral-300/20 group-hover:to-transparent transition-all duration-300" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.main>

      {/* Apple-like Animations & Shadow */}
      <style>
        {`
          .shadow-apple-card {
            box-shadow: 0 2px 10px 0 rgba(44,44,84,.04), 0 1.5px 5px 0 rgba(20,20,40,.04);
          }
          .shadow-apple-card-hover {
            box-shadow: 0 8px 24px 0 rgba(20,20,40,.13), 0 2.5px 6px 0 rgba(20,20,40,.08);
          }
          .bg-gradient-radial {
            background: radial-gradient(ellipse 100% 60% at 50% 90%, rgba(230,232,238,0.3) 0%, transparent 100%);
          }
        `}
      </style>
    </div>
  );
}

export default Home;