'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {

    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const observers = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 } // Trigger when 50% of the section is visible
        )

        // Grab all sections that have an ID matching our links
        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observers.observe(section))

        return () => observers.disconnect()
    }, [])

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Tracks', href: '#tracks' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Team', href: '#team' },
        { name: 'FAQ', href: '#faq' },
    ]
    return (
            <nav className="fixed top-0 w-full z-50 glass-panel bg-white/4 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                        <img
                            alt="Futuristic spaceship with crewmates"
                            className="relative scale-150"
                            src="https://apex-assets-exl.pages.dev/image/LOGO.svg"
                            width={15}
                            height={5}
                            style={{ width: '15rem', height: '5rem' }}
                        />
                    <div className="font-joffrey hidden md:flex items-center space-x-8 text-[1.5rem] tracking-wider uppercase text-white ">
                        {navLinks.map((link) => {
                        // Check if active (strip the # for comparison)
                        const isActive = activeSection === link.href.replace('#', '') || 
                                       (link.href === '#' && activeSection === 'home')

                        return (
                            <Link 
                                key={link.name}
                                href={link.href}
                                className={`transition-all duration-300 hover:text-gray-200 ${
                                    isActive ? 'border-b-2 border-primary pb-1' : 'border-b-2 border-transparent pb-1'
                                }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                        <button className="font-joffrey px-6 py-2 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 0transition-all duration-300 neon-border-cyan">
                            REGISTER
                        </button>
                    </div>
                </div>
            </nav>
    )
}
