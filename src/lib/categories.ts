import { GET_ALL_CATEGORIES } from '@/queries/categories'
import { getApolloClient } from './apollo-client'

export async function getAllCategories() {
  try {
    const apolloClient = getApolloClient()
    const { data }: { data: RootQueryToCategoryConnection } =
      await apolloClient.query({
        query: GET_ALL_CATEGORIES,
      })

    return data.categories.nodes
  } catch (err) {
    console.log(err)
  }
}
