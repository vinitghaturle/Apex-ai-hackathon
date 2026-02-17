'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { CrewmateAvatar } from '@/components/crewmate-avatar';
import { AmongUsButton } from '@/components/among-us-button';
import { AmongUsInput } from '@/components/among-us-input';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError.message || 'Failed to sign in. Check your credentials.');
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0c10] relative overflow-hidden flex items-center justify-center p-4">
            {/* Space Background */}
            <div className="absolute inset-0 stars-bg opacity-30" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C51111]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#38FEDC]/10 rounded-full blur-[100px]" />

            {/* Floating Crewmates */}
            <div className="absolute top-20 left-10 opacity-40">
                <CrewmateAvatar color="cyan" size="md" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-40">
                <CrewmateAvatar color="green" size="md" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-[#1a0b0b]/90 backdrop-blur-xl border-2 border-[#C51111]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(197,17,17,0.2)]">
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C51111] rounded-tl-3xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C51111] rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C51111] rounded-bl-3xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C51111] rounded-br-3xl" />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <CrewmateAvatar color="red" size="xl" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                            Enter The Skeld
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-[#38FEDC] font-bold">
                            Access Terminal Login
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-[#F42525]/10 border border-[#F42525] rounded-lg flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#F42525] text-xl">warning</span>
                            <p className="text-sm text-[#F42525] font-bold">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AmongUsInput
                            type="email"
                            label="Email Address"
                            placeholder="crewmate@skeld.ship"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <AmongUsInput
                            type="password"
                            label="Access Code"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <AmongUsButton
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="w-full"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">login</span>
                                Enter Skeld
                            </span>
                        </AmongUsButton>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-white/50 uppercase tracking-widest">
                            New Crewmate?{' '}
                            <Link
                                href="/register"
                                className="text-[#38FEDC] hover:text-[#2DD4B8] font-bold transition-colors"
                            >
                                Join The Crew
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-6 text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-[#38FEDC] rounded-full animate-pulse" />
                        System Status: Online
                    </p>
                </div>
            </div>

            <style jsx>{`
        .stars-bg {
          background-image: radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),
            radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px);
          background-size: 550px 550px, 350px 350px, 250px 250px;
          background-position: 0 0, 40px 60px, 130px 270px;
        }
      `}</style>
        </div>
    );
}
