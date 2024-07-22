import { ApolloQueryResult } from '@apollo/client'
import { getApolloClient } from './apollo-client'
import { GET_ALL_TAGS } from '@/queries/tags'

export async function getAllTags() {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<any> = await client.query({
      query: GET_ALL_TAGS,
    })

    // console.log('tags: ', data.tags.nodes)

    return data.tags.nodes
  } catch (err) {
    console.error(err)
  }
}
