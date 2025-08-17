import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personalized Content Dashboard',
  description: 'A dynamic dashboard for personalized content tracking and interaction',
  keywords: ['dashboard', 'content', 'news', 'recommendations', 'social media'],
  authors: [{ name: 'Abhishek Varma' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-dark-bg text-dark-text`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
