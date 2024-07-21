import { ApolloQueryResult } from '@apollo/client'
import { getApolloClient } from './apollo-client'
import { GET_ALL_PAGES, GET_PAGE_BY_URI } from '@/queries/pages'

export async function getAllPages() {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPagesConnection> =
      await client.query({
        query: GET_ALL_PAGES,
      })

    return data.pages.nodes.map((page) => ({
      uri: page.uri,
      title: page.title,
      hasParent: page.parent?.node ? true : false,
      children: page.children?.nodes,
    }))
  } catch (err) {
    console.error(err)
  }
}

export async function getPageByUri(uri: string) {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<PageDataResponse> = await client.query({
      query: GET_PAGE_BY_URI,
      variables: { uri },
    })

    return data.pageBy
  } catch (err) {
    console.error(err)
  }
}
