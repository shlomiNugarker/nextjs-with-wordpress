import { getApolloClient } from './apollo-client'
import {
  QUERY_ALL_CATEGORIES,
  QUERY_CATEGORY_BY_SLUG,
  QUERY_CATEGORY_SEO_BY_SLUG,
} from '../data/categories'
import { ApolloQueryResult } from '@apollo/client/core'

// Define the types for your queries
type CategoryNode = {
  node: {
    id: string
    name: string
    slug: string
    [key: string]: any
  }
}

type SeoData = {
  title?: string
  metaDesc?: string
  canonical?: string
  opengraphAuthor?: string
  opengraphDescription?: string
  opengraphImage?: string
  opengraphModifiedTime?: string
  opengraphPublishedTime?: string
  opengraphPublisher?: string
  opengraphTitle?: string
  opengraphType?: string
  metaRobotsNofollow?: string
  metaRobotsNoindex?: string
  twitterDescription?: string
  twitterImage?: string
  twitterTitle?: string
  [key: string]: any
}

type CategoryData = {
  id: string
  name: string
  slug: string
  title?: string
  description?: string
  canonical?: string
  og?: Record<string, any>
  article?: Record<string, any>
  robots?: Record<string, any>
  twitter?: Record<string, any>
  [key: string]: any
}

/**
 * categoryPathBySlug
 */
export function categoryPathBySlug(slug: string): string {
  return `/categories/${slug}`
}

/**
 * getAllCategories
 */
export async function getAllCategories(): Promise<{
  categories: CategoryNode[]
}> {
  const apolloClient = getApolloClient()

  const { data }: ApolloQueryResult<any> = await apolloClient.query({
    query: QUERY_ALL_CATEGORIES,
  })

  const categories =
    data?.categories?.edges.map(({ node }: CategoryNode) => node) || []

  return {
    categories,
  }
}

/**
 * getCategoryBySlug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<{ category?: CategoryData }> {
  const apolloClient = getApolloClient()
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT as string).host

  let categoryData: ApolloQueryResult<any>
  let seoData: ApolloQueryResult<any> | undefined

  try {
    categoryData = await apolloClient.query({
      query: QUERY_CATEGORY_BY_SLUG,
      variables: {
        slug,
      },
    })
  } catch (e) {
    console.log(
      `[categories][getCategoryBySlug] Failed to query category data: ${
        (e as Error).message
      }`
    )
    throw e
  }

  if (!categoryData?.data?.category) return { category: undefined }

  const category = mapCategoryData(categoryData.data.category)

  // If the SEO plugin is enabled, look up the data and apply it to the default settings
  if (process.env.WORDPRESS_PLUGIN_SEO === 'true') {
    try {
      seoData = await apolloClient.query({
        query: QUERY_CATEGORY_SEO_BY_SLUG,
        variables: {
          slug,
        },
      })
    } catch (e) {
      console.log(
        `[categories][getCategoryBySlug] Failed to query SEO plugin: ${
          (e as Error).message
        }`
      )
      console.log(
        'Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.'
      )
      throw e
    }

    const { seo = {} }: { seo: SeoData } = seoData?.data?.category || {}

    category.title = seo.title
    category.description = seo.metaDesc

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      category.canonical = seo.canonical
    }

    category.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    }

    category.article = {
      author: category.og.author,
      modifiedTime: category.og.modifiedTime,
      publishedTime: category.og.publishedTime,
      publisher: category.og.publisher,
    }

    category.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    }

    category.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    }
  }

  return {
    category,
  }
}

/**
 * getCategories
 */
export async function getCategories({
  count,
}: { count?: number } = {}): Promise<{ categories: CategoryNode[] }> {
  const { categories } = await getAllCategories()
  return {
    categories: categories.slice(0, count),
  }
}

/**
 * mapCategoryData
 */
export function mapCategoryData(category: any = {}): CategoryData {
  const data: CategoryData = { ...category }
  return data
}
