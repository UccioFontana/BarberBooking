import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LogPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ripple, setRipple] = useState(false);
  const navigate = useNavigate();

  // Per ripple login
  const handleLogin = (e) => {
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 520);

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      setError("");
      navigate("/admin/dashboard");
    } else {
      setError("Credenziali non valide");
    }
  };

  // Headline effetto reveal lettera per lettera
  const title = "Accesso Admin";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 bg-gradient-to-br from-zinc-100 via-neutral-200 to-neutral-300 transition-all duration-1000">
      <header className="text-center max-w-3xl mb-16">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 mb-7 tracking-tight select-none"
          style={{ letterSpacing: "-.02em", lineHeight: 1.08 }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.045 } },
          }}
        >
          {title.split("").map((l, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
              }}
              className={l === " " ? "inline-block w-2 sm:w-3" : "inline-block"}
              aria-hidden="true"
            >
              {l}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-neutral-700 font-light tracking-wide max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.4,0,0.2,1] }}
        >
          Inserisci le credenziali per visualizzare le prenotazioni attive.
        </motion.p>
      </header>
      <motion.form
        className="relative bg-white/80 shadow-2xl rounded-3xl p-10 border border-neutral-200 max-w-md w-full
        flex flex-col gap-4 backdrop-blur-lg"
        initial={{ opacity: 0, y: 44, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-neutral-300 text-zinc-900 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-neutral-300 text-zinc-900 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
        />
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-500 text-sm mb-2"
              initial={{ x: -22, opacity: 0 }}
              animate={{ x: 0, opacity: 1, rotate: [0, -3, 3, 0] }}
              exit={{ opacity: 0, x: 22 }}
              transition={{ duration: 0.38, type: "spring", stiffness: 270 }}
              key={error}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          className="w-full relative overflow-hidden bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center group"
          whileTap={{ scale: 0.96 }}
        >
          <span>Accedi</span>
          {/* Ripple animazione */}
          <AnimatePresence>
            {ripple && (
              <motion.span
                className="absolute inset-0 pointer-events-none"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 2.1, opacity: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: "radial-gradient(circle, #2e2e2e44 0%, transparent 70%)" }}
                transition={{ duration: 0.55, ease: [0.41,0,0.17,1] }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </motion.form>
    </div>
  );
}