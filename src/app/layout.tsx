import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import AuthEnforcer from '../components/AuthEnforcer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AquaNest - Modern Water Delivery",
  description: "Modern water delivery for your home or business. Browse products, order online, and track your delivery with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-50 min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <div className="pt-16">
              <AuthEnforcer>{children}</AuthEnforcer>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
