"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from '../../utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://aquanestbackend-production.up.railway.app/api";

type Order = {
  _id: string;
  products: { product: { name: string }; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchWithAuth(`${API_URL}/orders`);
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-3xl w-full mx-auto border border-white/40"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg">Your Orders</h2>
        {error && (
          <div className="text-center text-red-600 mb-4">{error}</div>
        )}
        {loading ? (
          <div className="text-blue-800 text-center">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-blue-800 text-center">No orders found.</div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/60 backdrop-blur-lg rounded-xl shadow p-6 border border-white/40"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-blue-900">Order #{order._id.slice(-6)}</div>
                    <div className="text-blue-700 text-sm">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="mb-2">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="text-blue-800">
                        {item.product.name} x {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-blue-900">Total: ${order.total.toFixed(2)}</div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300">
                      {order.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
} 
