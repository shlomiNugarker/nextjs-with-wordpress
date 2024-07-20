import { GET_ALL_POSTS } from '@/queries/posts'
import { getApolloClient } from './apollo-client'
import { Post } from '@/types/Post'

export async function getAllPosts(): Promise<Post[]> {
  const client = getApolloClient()
  const { data } = await client.query({
    query: GET_ALL_POSTS,
  })

  return data.posts.nodes
}
