import { GET_ALL_POSTS } from '@/queries/posts'
import { getApolloClient } from './apollo-client'

export async function getAllPosts() {
  const client = getApolloClient()
  const { data }: { data: RootQueryToPostsConnection } = await client.query({
    query: GET_ALL_POSTS,
  })

  return data.posts.nodes
}
