'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/');
            } else if (requireAdmin && role !== 'admin') {
                router.push('/dashboard');
            }
        }
    }, [user, role, loading, requireAdmin, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#C51111] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/70 text-sm uppercase tracking-widest font-bold">
                        Accessing Skeld Systems...
                    </p>
                </div>
            </div>
        );
    }

    if (!user || (requireAdmin && role !== 'admin')) {
        return null;
    }

    return <>{children}</>;
}
