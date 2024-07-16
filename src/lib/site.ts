import { getApolloClient } from './apollo-client'
import { decodeHtmlEntities, removeExtraSpaces } from './util'
import { QUERY_SITE_DATA, QUERY_SEO_DATA } from '../data/site'

interface SocialSettings {
  [key: string]: any
}

interface WebmasterSettings {
  [key: string]: string
}

interface TwitterSettings {
  username?: string
  url?: string
  cardType?: string
}

interface GeneralSettings {
  title?: string
  description?: string
  language?: string
}

interface SiteMetadata {
  title?: string
  siteTitle?: string
  description?: string
  language?: string
  social?: SocialSettings
  webmaster?: WebmasterSettings
  twitter?: TwitterSettings
}

/**
 * getSiteMetadata
 */
export async function getSiteMetadata() {
  const apolloClient = getApolloClient()

  let siteData
  let seoData

  try {
    siteData = await apolloClient.query({
      query: QUERY_SITE_DATA,
    })
  } catch (e) {
    console.log(
      `[site][getSiteMetadata] Failed to query site data: ${
        (e as Error).message
      }`
    )
    throw e
  }

  const { generalSettings } = siteData?.data || {}
  let { title, description, language } = generalSettings as GeneralSettings

  const settings: SiteMetadata = {
    title,
    siteTitle: title,
    description,
  }

  if (!language || language === '') {
    settings.language = 'en'
  } else {
    settings.language = language.split('_')[0]
  }

  if (process.env.WORDPRESS_PLUGIN_SEO === 'true') {
    try {
      seoData = await apolloClient.query({
        query: QUERY_SEO_DATA,
      })
    } catch (e) {
      console.log(
        `[site][getSiteMetadata] Failed to query SEO plugin: ${
          (e as Error).message
        }`
      )
      console.log(
        'Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.'
      )
      throw e
    }

    const { webmaster, social } = seoData?.data?.seo || {}

    if (social) {
      settings.social = {}

      Object.keys(social).forEach((key) => {
        const { url } = social[key]
        if (!url || key === '__typename') return
        if (settings.social) settings.social[key] = url
      })
    }

    if (webmaster) {
      settings.webmaster = {}

      Object.keys(webmaster).forEach((key) => {
        if (!webmaster[key] || key === '__typename') return
        if (settings.webmaster) settings.webmaster[key] = webmaster[key]
      })
    }

    if (social?.twitter) {
      settings.twitter = {
        username: social.twitter.username,
        cardType: social.twitter.cardType,
      }

      if (settings?.social?.twitter)
        settings.social.twitter = {
          url: `https://twitter.com/${settings.twitter.username}`,
        }
    }
  }

  settings.title = decodeHtmlEntities(settings.title)

  return settings
}

/**
 * constructPageMetadata
 */
export function constructPageMetadata(
  defaultMetadata: any = {},
  pageMetadata: any = {},
  options: { router?: any; homepage?: string } = {}
): any {
  const { router = {}, homepage = '' } = options
  const { asPath } = router

  const url = `${homepage}${asPath}`
  const pathname = new URL(url).pathname
  const canonical = pageMetadata.canonical || `${homepage}${pathname}`

  const metadata: any = {
    canonical,
    og: {
      url,
    },
    twitter: {},
  }

  const staticProperties = ['description', 'language', 'title']

  staticProperties.forEach((property) => {
    const value =
      typeof pageMetadata[property] !== 'undefined'
        ? pageMetadata[property]
        : defaultMetadata[property]

    if (typeof value === 'undefined') return

    metadata[property] = value
  })

  if (pageMetadata.og) {
    const ogProperties = [
      'description',
      'imageUrl',
      'imageHeight',
      'imageSecureUrl',
      'imageWidth',
      'title',
      'type',
    ]

    ogProperties.forEach((property) => {
      const pageOg = pageMetadata.og?.[property]
      const pageStatic = pageMetadata[property]
      const defaultOg = defaultMetadata.og?.[property]
      const defaultStatic = defaultMetadata[property]
      const value = pageOg || pageStatic || defaultOg || defaultStatic

      if (typeof value === 'undefined') return

      metadata.og[property] = value
    })
  }

  if (pageMetadata.twitter) {
    const twitterProperties = [
      'cardType',
      'description',
      'imageUrl',
      'title',
      'username',
    ]

    twitterProperties.forEach((property) => {
      const pageTwitter = pageMetadata.twitter?.[property]
      const pageOg = metadata.og[property]
      const value = pageTwitter || pageOg

      if (typeof value === 'undefined') return

      metadata.twitter[property] = value
    })
  }

  if (metadata.og.type === 'article' && pageMetadata.article) {
    metadata.article = {}

    const articleProperties = [
      'author',
      'modifiedTime',
      'publishedTime',
      'publisher',
    ]

    articleProperties.forEach((property) => {
      const value = pageMetadata.article[property]

      if (typeof value === 'undefined') return

      metadata.article[property] = value
    })
  }

  return metadata
}
