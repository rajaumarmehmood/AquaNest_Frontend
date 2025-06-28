"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from '../../utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Testimonial = {
  _id: string;
  user: { name: string };
  text: string;
  rating: number;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchWithAuth(`${API_URL}/testimonials`);
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await res.json();
        setTestimonials(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [index, testimonials.length]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-3xl w-full mx-auto border border-white/40"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg">Customer Testimonials</h2>
        {error && (
          <div className="text-center text-red-600 mb-4">{error}</div>
        )}
        {loading ? (
          <div className="text-blue-800 text-center">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-blue-800 text-center">No testimonials yet.</div>
        ) : (
          <div className="relative h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index]._id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow p-6 text-center text-blue-800 mx-auto max-w-xl border border-white/40">
                  <div className="mb-2 text-lg font-semibold text-blue-900">{testimonials[index].user?.name || "Anonymous"}</div>
                  <div className="mb-2">{"★".repeat(testimonials[index].rating)}{"☆".repeat(5 - testimonials[index].rating)}</div>
                  <div className="italic">"{testimonials[index].text}"</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
} 