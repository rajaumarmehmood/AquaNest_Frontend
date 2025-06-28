"use client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", type: "bottle", size: "", price: "", image: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/products${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed");
      setForm({ name: "", description: "", type: "bottle", size: "", price: "", image: "" });
      setEditingId(null);
      setMessage(editingId ? "Product updated!" : "Product added!");
      fetchProducts();
    } catch (err: any) {
      setMessage(err.message || "Error");
    }
  };

  const handleEdit = (product: any) => {
    setForm({ ...product, price: String(product.price) });
    setEditingId(product._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed");
      setMessage("Product deleted!");
      fetchProducts();
    } catch (err: any) {
      setMessage(err.message || "Error");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Products</h3>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded">
          <option value="bottle">Bottle</option>
          <option value="gallon">Gallon</option>
          <option value="dispenser">Dispenser</option>
        </select>
        <input name="size" value={form.size} onChange={handleChange} placeholder="Size (e.g. 1L, 5 Gallon)" className="p-2 border rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" step="0.01" className="p-2 border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded" />
        <button type="submit" className="bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition col-span-full">{editingId ? "Update" : "Add"} Product</button>
      </form>
      {message && <div className="mb-4 text-blue-800">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Size</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.type}</td>
                <td className="p-2">{product.size}</td>
                <td className="p-2">${product.price.toFixed(2)}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="text-blue-700 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 