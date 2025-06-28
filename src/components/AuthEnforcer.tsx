'use client';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthEnforcer({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (!user && !isAuthPage) {
      router.replace('/login');
    }
    if (user && isAuthPage) {
      router.replace('/');
    }
  }, [user, isAuthPage, router]);

  if (!user && !isAuthPage) return null;
  return <>{children}</>;
} 