import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import JsonLd from '@/components/JsonLd'
import { AuthProvider } from '@/lib/auth-context'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: 'APEX-AI | The Ultimate AI Hackathon at GHRCE Nagpur',
    template: '%s | APEX-AI Hackathon'
  },
  description: "APEX-AI is Nagpur's ultimate 10-hour AI innovation challenge. Hosted at G.H. Raisoni College of Engineering, powered by GDGOC GHRCE, SRC, and IEEE CS. Join us on February 18, 2026 to prototype AI-driven solutions for the real world.",
  keywords: [
    'APEX-AI', 'AI Hackathon', 'Hackathon Nagpur', 'GHRCE Hackathon',
    'AI Competition', 'GDGOC GHRCE', 'IEEE CS', 'Student Hackathon',
    'Machine Learning', 'Artificial Intelligence', 'Nagpur', 'Maharashtra',
    'Tech Event 2026', 'Coding Competition', 'Innovation Challenge',
    'AI Innovation', 'Tech Competition India', 'College Hackathon',
    'February 2026 Events', 'G.H. Raisoni College'
  ],
  applicationName: 'APEX-AI Hackathon',
  authors: [{ name: 'APEX-AI Organizing Committee' }],
  creator: 'Vinit Ghaturle and Team',
  publisher: 'GDGOC GHRCE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: 'origin-when-cross-origin',

  // Verification
  verification: {
    google: 'f3B3cr1-8jQOQk0Ql4KOZv_TPIoT82A0f607aOdlrTA',
  },

  // Canonical & Robots
  metadataBase: new URL('https://apexai.gdgocghrce.in'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://apexai.gdgocghrce.in',
    siteName: 'APEX-AI Hackathon',
    title: 'APEX-AI | The Ultimate AI Hackathon at GHRCE Nagpur',
    description: "Nagpur's ultimate 10-hour AI innovation challenge. Join 25+ teams at GHRCE on February 18, 2026. $400+ in prizes!",
    images: [
      {
        url: 'https://apex-assets-exl.pages.dev/image/LOGO.svg',
        width: 1200,
        height: 630,
        alt: 'APEX-AI Hackathon Logo',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'APEX-AI | The Ultimate AI Hackathon',
    description: "Nagpur's 10-hour AI innovation challenge at GHRCE. February 18, 2026 - Register Now!",
    images: ['https://apex-assets-exl.pages.dev/image/LOGO.svg'],
  },

  // Icons
  icons: {
    icon: 'https://apex-assets-exl.pages.dev/image/shh.webp',
    apple: 'https://apex-assets-exl.pages.dev/image/shh.webp',
  },

  // Category
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
