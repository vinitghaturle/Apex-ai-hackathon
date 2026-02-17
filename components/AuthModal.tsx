'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CrewmateAvatar } from '@/components/crewmate-avatar';
import { AmongUsButton } from '@/components/among-us-button';
import { AmongUsInput } from '@/components/among-us-input';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<'login' | 'register'>(initialView);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signUp } = useAuth();
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (view === 'login') {
                const { error } = await signIn(email, password);
                if (error) throw error;
                onClose();
                router.push('/dashboard');
            } else {
                if (password !== confirmPassword) {
                    throw new Error('Access codes do not match!');
                }
                const { error } = await signUp(email, password, username);
                if (error) throw error;
                // Optionally switch to login view or close modal
                setView('login');
                setError('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleView = () => {
        setView(view === 'login' ? 'register' : 'login');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#1a0b0b]/95 backdrop-blur-xl border-2 border-[#C51111]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(197,17,17,0.2)] overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C51111] rounded-tl-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C51111] rounded-tr-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C51111] rounded-bl-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C51111] rounded-br-3xl pointer-events-none" />

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <CrewmateAvatar color={view === 'login' ? 'red' : 'cyan'} size="lg" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                        {view === 'login' ? 'Enter The Skeld' : 'Join The Crew'}
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-[#38FEDC] font-bold">
                        {view === 'login' ? 'Identity Verification' : 'New Recruit Registration'}
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className={`mb-6 p-3 ${error.includes('successful') ? 'bg-[#38FEDC]/10 border-[#38FEDC]' : 'bg-[#F42525]/10 border-[#F42525]'} border rounded-lg flex items-start gap-2`}>
                        <span className={`material-symbols-outlined text-lg ${error.includes('successful') ? 'text-[#38FEDC]' : 'text-[#F42525]'}`}>
                            {error.includes('successful') ? 'check_circle' : 'warning'}
                        </span>
                        <p className={`text-xs font-bold ${error.includes('successful') ? 'text-[#38FEDC]' : 'text-[#F42525]'}`}>{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'register' && (
                        <AmongUsInput
                            type="text"
                            label="Crewmate Name"
                            placeholder="RedSus"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}

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

                    {view === 'register' && (
                        <AmongUsInput
                            type="password"
                            label="Confirm Access Code"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}

                    <AmongUsButton
                        type="submit"
                        variant={view === 'login' ? 'primary' : 'secondary'}
                        loading={loading}
                        className="w-full mt-4"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">{view === 'login' ? 'login' : 'person_add'}</span>
                            {view === 'login' ? 'Enter Skeld' : 'Join The Crew'}
                        </span>
                    </AmongUsButton>
                </form>

                {/* Toggle View */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-widest">
                        {view === 'login' ? 'New Crewmate?' : 'Already have ID?'}
                        <button
                            onClick={toggleView}
                            className="ml-2 text-[#38FEDC] hover:text-[#2DD4B8] font-bold transition-colors underline decoration-2 underline-offset-4"
                        >
                            {view === 'login' ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
