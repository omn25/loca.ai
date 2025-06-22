import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'loca.ai',
  description: 'AI-powered ads that actually work for local businesses.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
