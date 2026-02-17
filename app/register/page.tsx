'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { CrewmateAvatar } from '@/components/crewmate-avatar';
import { AmongUsButton } from '@/components/among-us-button';
import { AmongUsInput } from '@/components/among-us-input';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (password !== confirmPassword) {
            setError('Access codes do not match!');
            return;
        }

        if (password.length < 6) {
            setError('Access code must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        const { error: signUpError } = await signUp(email, password, username);

        if (signUpError) {
            setError(signUpError.message || 'Failed to register. Please try again.');
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0c10] relative overflow-hidden flex items-center justify-center p-4">
            {/* Space Background */}
            <div className="absolute inset-0 stars-bg opacity-30" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#38FEDC]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#C51111]/10 rounded-full blur-[100px]" />

            {/* Floating Crewmates */}
            <div className="absolute top-10 left-20 opacity-40">
                <CrewmateAvatar color="blue" size="md" />
            </div>
            <div className="absolute top-40 right-20 opacity-40">
                <CrewmateAvatar color="yellow" size="sm" />
            </div>
            <div className="absolute bottom-20 left-10 opacity-40">
                <CrewmateAvatar color="purple" size="md" />
            </div>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-[#1a0b0b]/90 backdrop-blur-xl border-2 border-[#38FEDC]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(56,254,220,0.2)]">
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#38FEDC] rounded-tl-3xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#38FEDC] rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#38FEDC] rounded-bl-3xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#38FEDC] rounded-br-3xl" />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center gap-4 mb-4">
                            <CrewmateAvatar color="red" size="lg" />
                            <CrewmateAvatar color="cyan" size="lg" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                            Join The Crew
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-[#38FEDC] font-bold">
                            New Crewmate Registration
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-[#38FEDC]/10 border border-[#38FEDC] rounded-lg flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#38FEDC] text-xl">check_circle</span>
                            <div>
                                <p className="text-sm text-[#38FEDC] font-bold">Registration Successful!</p>
                                <p className="text-xs text-white/70 mt-1">Redirecting to login...</p>
                            </div>
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-[#F42525]/10 border border-[#F42525] rounded-lg flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#F42525] text-xl">warning</span>
                            <p className="text-sm text-[#F42525] font-bold">{error}</p>
                        </div>
                    )}

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AmongUsInput
                            type="text"
                            label="Crewmate Name"
                            placeholder="RedSus"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

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

                        <AmongUsInput
                            type="password"
                            label="Confirm Access Code"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <AmongUsButton
                            type="submit"
                            variant="secondary"
                            loading={loading}
                            className="w-full"
                            disabled={success}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">person_add</span>
                                Join The Crew
                            </span>
                        </AmongUsButton>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-white/50 uppercase tracking-widest">
                            Already a Crewmate?{' '}
                            <Link
                                href="/login"
                                className="text-[#38FEDC] hover:text-[#2DD4B8] font-bold transition-colors"
                            >
                                Enter The Skeld
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-6 text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-[#38FEDC] rounded-full animate-pulse" />
                        Recruitment Status: Active
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
