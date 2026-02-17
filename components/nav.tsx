'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { CrewmateAvatar } from './crewmate-avatar'
import AuthModal from './AuthModal'

interface NavbarProps {
    onOpenAuthModal?: (view: 'login' | 'register') => void;
}

export default function Navbar({ onOpenAuthModal }: NavbarProps) {

    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLocalAuthModalOpen, setIsLocalAuthModalOpen] = useState(false)
    const [localAuthModalView, setLocalAuthModalView] = useState<'login' | 'register'>('login')

    const { user, loading, signOut } = useAuth()

    useEffect(() => {
        const observers = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observers.observe(section))

        return () => observers.disconnect()
    }, [])

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/'; // Redirect to home after logout
    };

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false)
    }

    const handleAuthClick = (view: 'login' | 'register') => {
        setIsMobileMenuOpen(false)
        if (onOpenAuthModal) {
            onOpenAuthModal(view)
        } else {
            setLocalAuthModalView(view)
            setIsLocalAuthModalOpen(true)
        }
    }

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Tracks', href: '/#tracks' },
        { name: 'Schedule', href: '/#schedule' },
        { name: 'Team', href: '/#team' },
        { name: 'FAQ', href: '/#faq' },
    ]

    return (
        <>
            <nav className="fixed top-0 w-full z-50 glass-panel bg-white/5 backdrop-blur-sm border-b border-white/10">
                {/* Corrected: justify-between ensures Logo is Left and Hamburger is Right */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-[5.5rem] flex items-center justify-between">

                    <Link href="/">
                        <img
                            alt="Logo"
                            className="relative lg:scale-150 scale-100 object-left w-40 md:w-60 h-auto object-contain cursor-pointer"
                            src="https://apex-assets-exl.pages.dev/image/LOGO.svg"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="font-joffrey hidden md:flex items-center space-x-8 text-[1.5rem] tracking-wider uppercase text-white">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('/#', '') ||
                                (link.href === '/#' && activeSection === 'home')

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-all duration-300 hover:text-gray-200 ${isActive ? 'border-b-2 border-primary pb-1' : 'border-b-2 border-transparent pb-1'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}

                        {!loading && (
                            user ? (
                                <div className="flex items-center gap-4">
                                    <NavCountdown />
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 font-joffrey px-6 py-2 border-2 border-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-500/10 transition-all duration-300 neon-border-cyan"
                                    >
                                        <CrewmateAvatar color="cyan" size="sm" animated={false} className="w-6 h-6" />
                                        DASHBOARD
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                        title="Logout"
                                    >
                                        <span className="material-symbols-outlined">logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleAuthClick('register')}
                                        className="font-joffrey px-6 py-2 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 transition-all duration-300 neon-border-cyan"
                                    >
                                        REGISTER
                                    </button>
                                </div>
                            )
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 font-joffrey text-3xl tracking-wider uppercase text-white">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('/#', '') ||
                            (link.href === '/#' && activeSection === 'home')

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`transition-all duration-300 hover:text-gray-200 ${isActive ? 'border-b-2 border-primary pb-1' : 'border-b-2 border-transparent pb-1'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}

                    {!loading && (
                        user ? (
                            <div className="flex flex-col items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    onClick={handleLinkClick}
                                    className="font-joffrey px-8 py-3 border-2 border-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-500/10 transition-all duration-300 neon-border-cyan flex items-center gap-2"
                                >
                                    <CrewmateAvatar color="cyan" size="sm" animated={false} className="w-6 h-6" />
                                    DASHBOARD
                                </Link>
                                <NavCountdown />
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        handleLinkClick();
                                    }}
                                    className="font-joffrey text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-sm"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-6 mt-4">
                                <button
                                    onClick={() => handleAuthClick('register')}
                                    className="font-joffrey px-8 py-3 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 transition-all duration-300 neon-border-cyan"
                                >
                                    REGISTER
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Only render local modal if handler is not provided */}
            {!onOpenAuthModal && (
                <AuthModal
                    isOpen={isLocalAuthModalOpen}
                    onClose={() => setIsLocalAuthModalOpen(false)}
                    initialView={localAuthModalView}
                />
            )}
        </>
    )
}

function NavCountdown() {
    const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number }>({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        const targetDate = new Date("2026-02-18T09:00:00");
        const interval = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) return;

            const totalSeconds = Math.floor(diff / 1000);
            setTimeLeft({
                h: Math.floor(totalSeconds / 3600),
                m: Math.floor((totalSeconds % 3600) / 60),
                s: totalSeconds % 60,
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1 font-mono text-xs md:text-sm text-[#f42525] bg-black/40 px-3 py-1 rounded border border-[#f42525]/30">
            <span className="animate-pulse">T-MINUS</span>
            <span className="font-bold">
                {String(timeLeft.h).padStart(2, '0')}:
                {String(timeLeft.m).padStart(2, '0')}:
                {String(timeLeft.s).padStart(2, '0')}
            </span>
        </div>
    );
}
