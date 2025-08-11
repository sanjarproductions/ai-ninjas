import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aininjas.com'),
  title: {
    default: 'AI Ninjas',
    template: '%s | AI Ninjas',
  },
  description:
    'Master the Art of AI. A step-by-step AI training program designed like martial arts — from beginner to mastery, with real coding skills and real-world impact.',
  alternates: {
    canonical: 'https://aininjas.com',
  },
  openGraph: {
    title: 'AI Ninjas',
    description:
      'Master the Art of AI. A step-by-step AI training program designed like martial arts — from beginner to mastery, with real coding skills and real-world impact.',
    url: 'https://aininjas.com',
    siteName: 'AI Ninjas',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'AI Ninjas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ninjas',
    description:
      'Master the Art of AI. A step-by-step AI training program designed like martial arts — from beginner to mastery, with real coding skills and real-world impact.',
    images: ['/logos/logo-light.png'],
  },
  icons: {
    icon: '/logos/small-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
// Add Google Analytics
// SEO Inshallah