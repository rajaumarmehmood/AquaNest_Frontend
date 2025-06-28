"use client";
import { useCart, CartItem } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full mx-auto border border-white/40"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg">Your Cart</h2>
        {items.length === 0 ? (
          <div className="text-blue-800 text-center">Your cart is empty.</div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <AnimatePresence>
                {items.map((item: CartItem) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between bg-white/60 backdrop-blur-lg rounded-xl shadow p-4 border border-white/40"
                  >
                    <div>
                      <div className="font-semibold text-blue-900">{item.name}</div>
                      <div className="text-blue-700">Qty: {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-blue-900 font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-blue-900">Total:</div>
              <div className="text-xl font-bold text-blue-900">${total.toFixed(2)}</div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-blue-900 rounded-full px-4 py-2 font-semibold hover:bg-gray-400 transition"
              >
                Clear Cart
              </button>
              <Link href="/orders">
                <button className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700 transition">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
} 