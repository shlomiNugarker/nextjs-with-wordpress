import { Helmet } from 'react-helmet'
import { authorPathByName } from './users'
import { postPathBySlug } from './posts'
import { pagePathBySlug } from './pages'
import config from '../../package.json'

interface Post {
  title?: string
  slug?: string
  excerpt?: string
  date?: string
  author?: {
    name?: string
  }
  categories?: { name: string }[]
  modified?: string
  featuredImage?: {
    sourceUrl?: string
  }
}

interface Author {
  name?: string
  avatar?: {
    url?: string
  }
  description?: string
}

interface ArticleJsonLdProps {
  post?: Post
  siteTitle?: string
}

export function ArticleJsonLd({
  post = {},
  siteTitle = '',
}: ArticleJsonLdProps) {
  const { homepage = '', faviconPath = '/favicon.ico' } = config as any
  const {
    title,
    slug,
    excerpt,
    date,
    author,
    categories = [],
    modified,
    featuredImage,
  } = post
  const path = postPathBySlug(slug || '')
  const datePublished = date ? new Date(date) : null
  const dateModified = modified ? new Date(modified) : datePublished

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${homepage}${path}`,
    },
    headline: title,
    image: [featuredImage?.sourceUrl],
    datePublished: datePublished ? datePublished.toISOString() : '',
    dateModified: dateModified ? dateModified.toISOString() : '',
    description: excerpt,
    keywords: categories.map(({ name }) => name).join(', '),
    copyrightYear: datePublished ? datePublished.getFullYear() : '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${homepage}${faviconPath}`,
      },
    },
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

interface WebsiteJsonLdProps {
  siteTitle?: string
}

export function WebsiteJsonLd({ siteTitle = '' }: WebsiteJsonLdProps) {
  const { homepage = '' } = config as any

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

interface WebpageJsonLdProps {
  title?: string
  description?: string
  siteTitle?: string
  slug?: string
}

export function WebpageJsonLd({
  title = '',
  description = '',
  siteTitle = '',
  slug = '',
}: WebpageJsonLdProps) {
  const { homepage = '' } = config as any
  const path = pagePathBySlug(slug)

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${homepage}${path}`,
    publisher: {
      '@type': 'ProfilePage',
      name: siteTitle,
    },
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

interface AuthorJsonLdProps {
  author?: Author
}

export function AuthorJsonLd({ author = {} }: AuthorJsonLdProps) {
  const { homepage = '' } = config as any
  const { name, avatar, description } = author
  const path = authorPathByName(name || '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    image: avatar?.url,
    url: `${homepage}${path}`,
    description: description,
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export function LogoJsonLd() {
  const { homepage = '', faviconPath = '/favicon.ico' } = config as any

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: `${homepage}`,
    logo: `${homepage}${faviconPath}`,
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
