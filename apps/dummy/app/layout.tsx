import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from './components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PingPulse - Uptime Monitoring Made Simple',
  description: 'Monitor your websites, APIs, and services 24/7. Get instant alerts when something goes wrong and keep your business running smoothly with PingPulse\'s reliable uptime monitoring.',
  keywords: 'uptime monitoring, website monitoring, server monitoring, downtime alerts, performance monitoring',
  authors: [{ name: 'PingPulse Team' }],
  openGraph: {
    title: 'PingPulse - Uptime Monitoring Made Simple',
    description: 'Monitor your websites, APIs, and services 24/7. Get instant alerts when something goes wrong.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PingPulse - Uptime Monitoring Made Simple',
    description: 'Monitor your websites, APIs, and services 24/7. Get instant alerts when something goes wrong.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}