import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/main.scss'
import Providers from '@/layouts/partials/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs + WordPress app',
  description: 'Nextjs + WordPress app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
