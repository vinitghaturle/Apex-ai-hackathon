'use client'

import { useState } from 'react'

interface RegisterModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 group"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/30 px-6 py-4">
                    <h2 className="font-joffrey text-2xl md:text-3xl text-white tracking-wider uppercase">
                        Event Registration
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Fill out the form below to register</p>
                </div>

                {/* Google Form iframe */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSejfPM5QdhmbdlDa_5Anyev8jCt1iXzFCxCAnyPJKi6S4pyEQ/viewform?embedded=true&rm=minimal"
                        width="100%"
                        height="1200"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="rounded-lg"
                        style={{ border: 'none' }}
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </div>
    )
}
