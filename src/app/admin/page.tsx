"use client";
import { useEffect, useState } from "react";
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';

function getUserRole() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).role : null;
}

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(getUserRole() === 'admin');
  }, []);

  if (!isAdmin) {
    return (
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Admin Dashboard</h2>
        <div className="text-red-600 text-center">Access denied. Admins only.</div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Admin Dashboard</h2>
      <div className="flex gap-4 justify-center mb-8">
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'products' ? 'bg-blue-700 text-white' : 'bg-white text-blue-900 border'}`}
          onClick={() => setTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'orders' ? 'bg-blue-700 text-white' : 'bg-white text-blue-900 border'}`}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
      </div>
      {tab === 'products' ? (
        <ProductManager />
      ) : (
        <OrderManager />
      )}
    </main>
  );
} 