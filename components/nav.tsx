'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {

    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false)
    }

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Tracks', href: '#tracks' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Team', href: '#team' },
        { name: 'FAQ', href: '#faq' },
    ]

    return (
        <>
            <nav className="fixed top-0 w-full z-50 glass-panel bg-white/5 backdrop-blur-sm border-b border-white/10">
    {/* Corrected: justify-between ensures Logo is Left and Hamburger is Right */}
    <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-[5.5rem] flex items-center justify-between">
        
        <img
            alt="Logo"
            className="relative lg:scale-150 scale-100 object-left w-40 md:w-60 h-auto object-contain" 
            src="https://apex-assets-exl.pages.dev/image/LOGO.svg"
        />

                    {/* Desktop Navigation */}
                    <div className="font-joffrey hidden md:flex items-center space-x-8 text-[1.5rem] tracking-wider uppercase text-white">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '') ||
                                (link.href === '#' && activeSection === 'home')

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
                        <button className="font-joffrey px-6 py-2 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 transition-all duration-300 neon-border-cyan">
                            REGISTER
                        </button>
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
                        const isActive = activeSection === link.href.replace('#', '') ||
                            (link.href === '#' && activeSection === 'home')

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
                    <button
                        className="font-joffrey px-8 py-3 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 transition-all duration-300 neon-border-cyan mt-4"
                        onClick={handleLinkClick}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
        </>
    )
}
