"use client";
import { useEffect, useState } from "react";

const API_URL = "https://aquanestbackend-production.up.railway.app/api";

const statuses = ["pending", "shipped", "delivered"];

export default function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/orders/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed");
      setMessage("Order status updated!");
      fetchOrders();
    } catch (err: any) {
      setMessage(err.message || "Error");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
      {message && <div className="mb-4 text-blue-800">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Order</th>
              <th className="p-2">User</th>
              <th className="p-2">Products</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t align-top">
                <td className="p-2">{order._id.slice(-6)}</td>
                <td className="p-2">{order.user?.name || "-"}</td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    {order.products.map((item: any, idx: number) => (
                      <li key={idx}>{item.product?.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2 capitalize">{order.status}</td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 
