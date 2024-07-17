import { getApolloClient } from './apollo-client'
import {
  QUERY_ALL_PAGES_INDEX,
  QUERY_ALL_PAGES_ARCHIVE,
  QUERY_ALL_PAGES,
  QUERY_PAGE_BY_URI,
  QUERY_PAGE_SEO_BY_URI,
} from '../data/pages'
import { ApolloQueryResult } from '@apollo/client'

/**
 * pagePathBySlug
 */
export function pagePathBySlug(slug: string): string {
  return `/${slug}`
}

/**
 * getPageByUri
 */
interface PageData {
  id: string
  uri: string
  title: string
  featuredImage?: { node: { sourceUrl: string } }
  parent?: { node: any }
  children?: { edges: { node: any }[] }
  seo?: any
  metaTitle?: string
  description?: string
  readingTime?: string
  canonical?: string
  og?: any
  robots?: any
  twitter?: any
  menuOrder?: any
  content: any
}

export async function getPageByUri(uri: string) {
  const apolloClient = getApolloClient()
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT!).host

  let pageData: ApolloQueryResult<any>
  let seoData: ApolloQueryResult<any>

  try {
    pageData = await apolloClient.query({
      query: QUERY_PAGE_BY_URI,
      variables: { uri },
    })
  } catch (e: any) {
    console.log(`[pages][getPageByUri] Failed to query page data: ${e.message}`)
    throw e
  }

  if (!pageData?.data.page) return { page: undefined }

  const page = [pageData?.data.page].map(mapPageData)[0]

  // If the SEO plugin is enabled, look up the data and apply it to the default settings
  if (process.env.WORDPRESS_PLUGIN_SEO === 'true') {
    try {
      seoData = await apolloClient.query({
        query: QUERY_PAGE_SEO_BY_URI,
        variables: { uri },
      })
    } catch (e: any) {
      console.log(
        `[pages][getPageByUri] Failed to query SEO plugin: ${e.message}`
      )
      console.log(
        'Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.'
      )
      throw e
    }

    const { seo = {} } = seoData?.data?.page || {}

    page.metaTitle = seo.title
    page.description = seo.metaDesc
    page.readingTime = seo.readingTime

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      page.canonical = seo.canonical
    }

    page.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    }

    page.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    }

    page.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    }
  }

  return { page }
}

/**
 * getAllPages
 */
const allPagesIncludesTypes = {
  all: QUERY_ALL_PAGES,
  archive: QUERY_ALL_PAGES_ARCHIVE,
  index: QUERY_ALL_PAGES_INDEX,
}

interface GetAllPagesOptions {
  queryIncludes?: 'all' | 'archive' | 'index'
}

interface GetAllPagesResult {
  pages: PageData[]
}

export async function getAllPages(
  options: GetAllPagesOptions = {}
): Promise<GetAllPagesResult> {
  const { queryIncludes = 'index' } = options
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: allPagesIncludesTypes[queryIncludes],
  })

  const pages = data?.data.pages.edges
    .map(({ node = {} }) => node)
    .map(mapPageData)

  return { pages }
}

/**
 * getTopLevelPages
 */
interface GetTopLevelPagesOptions extends GetAllPagesOptions {}

export async function getTopLevelPages(options: GetTopLevelPagesOptions) {
  const { pages } = await getAllPages(options)
  const navPages = pages.filter(({ parent }) => parent === null)
  navPages.sort((a, b) => parseFloat(a.menuOrder) - parseFloat(b.menuOrder))
  return navPages
}

/**
 * mapPageData
 */
export function mapPageData(page: PageData): PageData {
  const data = { ...page }

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage
  }

  if (data.parent) {
    data.parent = data.parent.node
  }

  if (data.children) {
    data.children = { edges: data.children.edges.map(({ node }) => node) }
  }

  return data
}

/**
 * getBreadcrumbsByUri
 */
interface Breadcrumb {
  id: string
  title: string
  uri: string
}

export function getBreadcrumbsByUri(
  uri: string,
  pages: PageData[]
): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = []
  const uriSegments = uri.split('/').filter((segment) => segment !== '')
  uriSegments.pop()

  do {
    const breadcrumb = pages.find(
      (page) => page.uri === `/${uriSegments.join('/')}/`
    )

    if (breadcrumb) {
      breadcrumbs.push({
        id: breadcrumb.id,
        title: breadcrumb.title,
        uri: breadcrumb.uri,
      })
    }

    uriSegments.pop()
  } while (uriSegments.length > 0)

  breadcrumbs.reverse()
  return breadcrumbs
}
