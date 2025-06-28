"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from '../../context/CartContext';
import { fetchWithAuth } from '../../utils/auth';

type Product = {
  _id: string;
  name: string;
  description: string;
  type: string;
  size: string;
  price: number;
  image?: string;
};

const API_URL = "https://aquanestbackend-production.up.railway.app/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        let url = `${API_URL}/products`;
        const params = [];
        if (type) params.push(`type=${type}`);
        if (size) params.push(`size=${size}`);
        if (params.length) url += `?${params.join("&")}`;
        
        const res = await fetchWithAuth(url);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [type, size]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-5xl w-full mx-auto border border-white/40"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg">Our Water Products</h2>
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select className="p-2 border rounded-full bg-white/70 shadow text-blue-900" value={type} onChange={e => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="bottle">Bottle</option>
            <option value="gallon">Gallon</option>
            <option value="dispenser">Dispenser</option>
          </select>
          <select className="p-2 border rounded-full bg-white/70 shadow text-blue-900" value={size} onChange={e => setSize(e.target.value)}>
            <option value="">All Sizes</option>
            <option value="500ml">500ml</option>
            <option value="750ml">750ml</option>
            <option value="1L">1L</option>
            <option value="5 Gallon">5 Gallon</option>
            <option value="Standard">Standard</option>
            <option value="100 tablets">100 tablets</option>
          </select>
        </div>
        {error && (
          <div className="text-center text-red-600 mb-4">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-blue-700">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-blue-800">No products found.</div>
            ) : (
              products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center border border-white/40 hover:scale-105 hover:shadow-2xl transition-transform"
                >
                  {product.image ? (
                    <Image src={product.image} alt={product.name} width={80} height={80} className="mb-4 rounded-full object-contain bg-blue-100" />
                  ) : (
                    <div className="w-20 h-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-400 text-3xl font-bold">?</div>
                  )}
                  <div className="font-bold text-blue-900 text-lg mb-1 text-center">{product.name}</div>
                  <div className="text-blue-700 mb-2 text-center">{product.type} • {product.size}</div>
                  <div className="text-blue-800 mb-2 text-center">{product.description}</div>
                  <div className="font-semibold text-blue-900 mb-2">${product.price.toFixed(2)}</div>
                  <button
                    className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                    onClick={() => addToCart({ productId: product._id, name: product.name, price: product.price, image: product.image })}
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 
