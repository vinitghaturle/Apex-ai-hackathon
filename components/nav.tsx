'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                        <img
                            alt="Futuristic spaceship with crewmates"
                            className="relative scale-150"
                            src="/LOGO.svg"
                            width={15}
                            height={5}
                            style={{ width: '15rem', height: '5rem' }}
                        />
                    <div className="font-joffrey hidden md:flex items-center space-x-8 text-[1.5rem] tracking-wider uppercase text-white ">
                        <Link className="hover:text-gray-200 transition-colors border-b-2 border-primary pb-1" href="#">
                            Home
                        </Link>
                        <Link className="hover:text-gray-200 transition-colors" href="#tracks">
                            Tracks
                        </Link>
                        <Link className="hover:text-gray-200 transition-colors" href="#schedule">
                            Schedule
                        </Link>
                        <Link className="hover:text-gray-200 transition-colors" href="#prizes">
                            Prizes
                        </Link>
                        <Link className="hover:text-gray-200 transition-colors" href="#faq">
                            FAQ
                        </Link>
                        <button className="font-joffrey px-6 py-2 border-2 border-gray text-white rounded-lg font-bold hover:bg-black hover:text-gray-200 0transition-all duration-300 neon-border-cyan">
                            REGISTER
                        </button>
                    </div>
                </div>
            </nav>
    )
}
