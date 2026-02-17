'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/lib/auth-context';
import { CrewmateAvatar } from '@/components/crewmate-avatar';
import { AmongUsButton } from '@/components/among-us-button';
import { useRouter } from 'next/navigation';

import DashboardCountdown from '@/components/DashboardCountdown';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Checkpoints, { Checkpoint } from '@/components/Checkpoints';
import { supabase } from '@/lib/supabase';
import useFCM from '@/hooks/useFCM';
import { Bell, BellOff, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
    const { user, role, isAdmin, signOut } = useAuth();
    const router = useRouter();
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [loadingCheckpoints, setLoadingCheckpoints] = useState(true);

    // Notification Hook
    const { requestPermission, permissionStatus } = useFCM();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    // Initial Fetch and Subscription
    useEffect(() => {
        const fetchCheckpoints = async () => {
            const { data, error } = await supabase
                .from('checkpoints')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) console.error('Error fetching checkpoints:', error);
            else setCheckpoints(data as Checkpoint[] || []);
            setLoadingCheckpoints(false);
        };

        fetchCheckpoints();

        const channel = supabase
            .channel('realtime_checkpoints')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'checkpoints' }, () => {
                fetchCheckpoints();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleCompleteCheckpoint = async (id: string) => {
        // Optimistic update
        const originalCheckpoints = [...checkpoints];
        setCheckpoints(prev => {
            const currentIndex = prev.findIndex(c => c.id === id);
            if (currentIndex === -1) return prev;
            const nextCheckpoints = [...prev];
            nextCheckpoints[currentIndex] = { ...nextCheckpoints[currentIndex], status: 'completed' };
            if (currentIndex + 1 < nextCheckpoints.length) {
                nextCheckpoints[currentIndex + 1] = { ...nextCheckpoints[currentIndex + 1], status: 'current' };
            }
            return nextCheckpoints;
        });

        // Database update
        try {
            const currentIndex = checkpoints.findIndex(c => c.id === id);
            if (currentIndex === -1) return;

            // Get checkpoint details for notification
            const checkpoint = checkpoints[currentIndex];

            // Update current to completed
            await supabase.from('checkpoints').update({ status: 'completed' }).eq('id', id);

            // Update next to current
            if (currentIndex + 1 < checkpoints.length) {
                const nextId = checkpoints[currentIndex + 1].id;
                await supabase.from('checkpoints').update({ status: 'current' }).eq('id', nextId);
            }

            // Trigger Notification API
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `Checkpoint Completed: ${checkpoint.title}`,
                    body: `${checkpoint.description} - Check dashboard for next steps!`,
                }),
            });

        } catch (error) {
            console.error('Error updating checkpoint:', error);
            setCheckpoints(originalCheckpoints); // Revert on failure
        }
    };

    const handleUndoCheckpoint = async (id: string) => {
        // Optimistic update
        const originalCheckpoints = [...checkpoints];
        setCheckpoints(prev => {
            const index = prev.findIndex(c => c.id === id);
            if (index === -1) return prev;
            const nextCheckpoints = [...prev];
            nextCheckpoints[index] = { ...nextCheckpoints[index], status: 'current' };
            if (index + 1 < nextCheckpoints.length) {
                nextCheckpoints[index + 1] = { ...nextCheckpoints[index + 1], status: 'pending' };
            }
            return nextCheckpoints;
        });

        // Database update
        try {
            const index = checkpoints.findIndex(c => c.id === id);
            if (index === -1) return;

            // Revert selected to current
            await supabase.from('checkpoints').update({ status: 'current' }).eq('id', id);

            // Revert next to pending
            if (index + 1 < checkpoints.length) {
                const nextId = checkpoints[index + 1].id;
                await supabase.from('checkpoints').update({ status: 'pending' }).eq('id', nextId);
            }
        } catch (error) {
            console.error('Error undoing checkpoint:', error);
            setCheckpoints(originalCheckpoints); // Revert on failure
        }
    };

    const handleAddCheckpoint = async () => {
        const title = window.prompt("Enter Checkpoint Title:");
        if (!title) return;

        const description = window.prompt("Enter Checkpoint Description:");
        if (!description) return;

        try {
            const maxOrder = checkpoints.length > 0
                ? Math.max(...checkpoints.map(c => c.order_index || 0))
                : 0;

            const newCheckpoint = {
                title,
                description,
                status: 'pending',
                order_index: maxOrder + 1
            };

            const { error } = await supabase.from('checkpoints').insert(newCheckpoint);
            if (error) throw error;
            toast.success("Checkpoint added successfully!");

        } catch (error) {
            console.error('Error adding checkpoint:', error);
            toast.error("Failed to add checkpoint");
        }
    };

    const handleDeleteCheckpoint = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this checkpoint?")) return;

        try {
            const { error } = await supabase.from('checkpoints').delete().eq('id', id);
            if (error) throw error;
            toast.success("Checkpoint deleted");
        } catch (error) {
            console.error('Error deleting checkpoint:', error);
            toast.error("Failed to delete checkpoint");
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#0b0c10] text-white selection:bg-[#f42525]/30 overflow-x-hidden font-display relative">
                {/* UI Overlay / CRT effect */}
                <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                {/* Space Viewport Background */}

                <div className="relative flex min-h-screen w-full flex-col z-10">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between border-b border-[#f42525]/20 bg-[#1a0b0b]/80 backdrop-blur-md px-6 md:px-12 py-4 z-40">
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-[#f42525] flex items-center justify-center">

                            </div>
                            <div>
                                <h2 className="text-white text-xl font-bold leading-tight tracking-tighter uppercase">Reactor Terminal v2.4</h2>
                                <p className="text-[10px] text-[#f42525] font-bold tracking-[0.2em] uppercase">Status: System Compromised</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notification Toggle */}
                            <button
                                onClick={requestPermission}
                                title={permissionStatus === 'granted' ? 'Notifications Active' : 'Enable Notifications'}
                                className={`
                                    p-2 rounded-lg border transition-all
                                    ${permissionStatus === 'granted'
                                        ? 'bg-[#38FEDC]/10 border-[#38FEDC]/30 text-[#38FEDC]'
                                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}
                                `}
                            >
                                {permissionStatus === 'granted' ? <Bell size={18} /> : <BellOff size={18} />}
                            </button>

                            <button
                                onClick={handleSignOut}
                                className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-[#f42525] hover:bg-red-700 transition-all text-white text-xs font-black tracking-widest shadow-[0_0_20px_rgba(244,37,37,0.4)] uppercase"
                            >
                                <span>Emergency Exit</span>
                            </button>
                            <div className="hidden md:block">
                                <CrewmateAvatar color={isAdmin ? 'red' : 'cyan'} size="sm" animated={false} />
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area: Cockpit/Reactor View */}
                    <main className="relative flex-1 flex flex-col items-center p-6 overflow-hidden">
                        {/* Notification Status Banner */}
                        {permissionStatus !== 'granted' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="w-full max-w-7xl mb-6 overflow-hidden"
                            >
                                <div className="bg-[#f42525]/10 border border-[#f42525]/30 rounded-lg p-3 flex items-center justify-between backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="size-6 bg-[#f42525]/20 rounded flex items-center justify-center">
                                            <BellOff size={14} className="text-[#f42525]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#f42525]">Alert: Mission Notifications Offline</p>
                                            <p className="text-[10px] text-white/60 uppercase">Enable notifications to receive real-time mission updates and emergency alerts.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={requestPermission}
                                        className="text-[10px] font-black uppercase tracking-tighter bg-[#f42525]/20 hover:bg-[#f42525]/40 text-[#f42525] px-4 py-1.5 rounded border border-[#f42525]/30 transition-all"
                                    >
                                        Enable Alerts
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* Left Tasks Sidebar - Replaced with Checkpoints */}
                            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 h-full">
                                <Checkpoints
                                    checkpoints={checkpoints}
                                    isAdmin={isAdmin}
                                    onComplete={handleCompleteCheckpoint}
                                    onUndo={handleUndoCheckpoint}
                                    onAdd={handleAddCheckpoint}
                                    onDelete={handleDeleteCheckpoint}
                                />
                            </div>

                            {/* Center Countdown Terminal */}
                            <div className="lg:col-span-6 flex flex-col items-center justify-center">
                                <DashboardCountdown />
                            </div>

                            {/* Right Security Status - Live Feed Placeholder */}
                            <div className="lg:col-span-3 flex flex-col gap-4">
                                <div className="bg-[#1a0b0b]/90 border border-[#f42525]/20 p-5 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden relative">
                                    <h3 className="text-white text-xs font-black tracking-tighter uppercase mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#f42525] text-sm">visibility</span> Live Feed
                                    </h3>
                                    <div className="aspect-video bg-zinc-950 rounded border border-white/10 mb-4 overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <img
                                            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7NFaUGzKh81sQp3EOS2hOfoaq5XzE4l9sHgu_nlp_7LVgbHwM4GkJyK7VRkk9u-7-GuI2Ddu-COS1C-bxipUxNwr9UEJdzlhbPcPXqQ52IrRp9XnZbWZmjByfstSgY2-Jastx7lOh4dWsqvLbt7Dr2dqef_Ik6G9JhnO-BEeeRhnb2soLf-7TOBs2OtfdTNjOk9_9gAcmDDEoaVeRk_Lw0DGtq8b_5SQVtkG18N5rS2IqrZnXUzjGmXCzoSIf_8QY7NHTXGL2jsY"
                                            alt="Live Feed"
                                        />
                                        <div className="absolute bottom-2 left-2">
                                            <p className="text-[8px] font-mono text-[#00ffff] tracking-tighter">CAM-01: REACTOR_ROOM</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/50">
                                            <span>Core Stability</span>
                                            <span className="text-[#f42525]">12%</span>
                                        </div>
                                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#f42525] h-full w-[12%] shadow-[0_0_8px_#f42525]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Role Panel */}
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                    <CrewmateAvatar color={isAdmin ? 'red' : 'cyan'} size="sm" animated={true} />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Current Role</p>
                                        <p className="text-xs font-bold text-[#f42525] uppercase transition-all">
                                            {isAdmin ? 'Base Commander' : 'Chief Engineer'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Status Marquee Ticker */}
                    <footer className="bg-[#f42525]/10 border-t border-[#f42525]/30 py-2 overflow-hidden whitespace-nowrap z-40">
                        <div className="flex animate-marquee items-center gap-12">
                            <span className="text-[#f42525] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span> ALERT: IMPOSTOR DETECTED IN SECTOR 7
                            </span>
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">memory</span> CPU LOAD AT 98% - COOLING REQUIRED
                            </span>
                            <span className="text-[#00ffff] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">wifi</span> NETWORK CONNECTED: SKELD_WIFI_5G
                            </span>
                            <span className="text-[#f42525] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span> ALERT: OXYGEN DEPLETED IN O2
                            </span>
                        </div>
                    </footer>
                </div>

                <style jsx>{`
                    .stars-bg {
                        background-image: radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px),
                        radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),
                        radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px);
                        background-size: 550px 550px, 350px 350px, 250px 250px;
                        background-position: 0 0, 40px 60px, 130px 270px;
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: inline-flex;
                        animation: marquee 30s linear infinite;
                        min-width: 200%;
                    }
                `}</style>
            </div>
        </ProtectedRoute>
    );
}


