import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/main.scss'
import theme from '../config/theme.json'
import config from '../config/config.json'
import Providers from '@/layouts/partials/Providers'
import { Header } from '@/layouts/components/Header'
import { getAllPages } from '@/lib/pages'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs + WordPress app',
  description: 'Nextjs + WordPress app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pages = await getAllPages()

  const pf = theme.fonts.font_family.primary
  const sf = theme.fonts.font_family.secondary
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="content" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? '&family=' + sf : ''
          }&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header pages={pages || []} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
