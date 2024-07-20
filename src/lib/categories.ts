import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_SLUG } from '@/queries/categories'
import { getApolloClient } from './apollo-client'

export async function getAllCategories() {
  try {
    const apolloClient = getApolloClient()
    const { data }: { data: RootQueryToCategoriesConnection } =
      await apolloClient.query({
        query: GET_ALL_CATEGORIES,
      })

    return data.categories.nodes
  } catch (err) {
    console.log(err)
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const apolloClient = getApolloClient()
    const { data }: { data: RootQueryToCategoryConnection } =
      await apolloClient.query({
        query: GET_CATEGORY_BY_SLUG,
        variables: {
          slug,
        },
      })

    return data.category
  } catch (err) {
    console.log(err)
  }
}
