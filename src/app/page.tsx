"use client";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500">
      {/* Animated floating water drop SVG */}
      <motion.svg
        initial={{ y: -30, opacity: 0.7 }}
        animate={{ y: [0, 20, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        width="120" height="120" viewBox="0 0 120 120" fill="none"
        className="absolute left-8 top-16 z-0 opacity-60"
      >
        <ellipse cx="60" cy="70" rx="40" ry="50" fill="url(#drop)" />
        <defs>
          <linearGradient id="drop" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </motion.svg>
      {/* Glassmorphism hero card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-xl mx-auto mt-24 mb-12 border border-white/40"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 text-center drop-shadow-lg"
        >
          Welcome to <span className="text-blue-500">AquaNest</span>
        </motion.h1>
        {user && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-blue-700 text-center mb-4"
          >
            Hello, {user.name}! 👋
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-blue-800 text-center max-w-xl mb-4"
        >
          Modern water delivery for your home or business. Browse products, order online, and track your delivery with ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex gap-4 mt-4"
        >
          <a href="/products" className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Shop Now</a>
          <a href="/about" className="px-6 py-2 rounded-full bg-white/70 text-blue-700 font-semibold shadow hover:bg-blue-100 transition border border-blue-200">Learn More</a>
        </motion.div>
      </motion.div>
      {/* Subtle animated bubbles */}
      <motion.div
        className="absolute bottom-0 left-0 w-full flex justify-center gap-8 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-blue-300"
            style={{ width: 30 + i * 10, height: 30 + i * 10 }}
            animate={{ y: [0, -30 - i * 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>
      <footer className="relative z-10 row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
