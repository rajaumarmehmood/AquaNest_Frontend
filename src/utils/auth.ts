// API URL for backend - ensure this matches Railway deployment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://aquanestbackend-production.up.railway.app/api";

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login failed');
  }
  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registration failed');
  }
  return await res.json();
}

export async function fetchWithAuth(url: string, options: any = {}) {
  const headers = { ...options.headers, ...getAuthHeaders() };
  return fetch(url, { ...options, headers });
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
