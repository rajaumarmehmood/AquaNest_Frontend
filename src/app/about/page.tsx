"use client";
import { motion } from 'framer-motion';

const timeline = [
  { year: '2021', event: 'AquaNest founded with a mission to deliver pure water.' },
  { year: '2022', event: 'Expanded to serve businesses and homes citywide.' },
  { year: '2023', event: 'Launched eco-friendly dispensers and smart delivery tracking.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-3xl w-full mx-auto border border-white/40"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg"
        >
          About AquaNest
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-blue-800 mb-8 text-center"
        >
          Our mission is to provide clean, reliable, and convenient water delivery with a focus on sustainability and customer satisfaction.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}
          className="space-y-6"
        >
          {timeline.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white/60 backdrop-blur-lg rounded-xl shadow p-4 border-l-4 border-blue-400"
            >
              <div className="font-semibold text-blue-700">{item.year}</div>
              <div className="text-blue-900">{item.event}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 