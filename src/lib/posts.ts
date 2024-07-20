import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SLUGS,
  GET_POST_BY_SLUG,
} from '@/queries/posts'
import { getApolloClient } from './apollo-client'

export async function getAllPosts() {
  try {
    const client = getApolloClient()
    const { data }: { data: RootQueryToPostsConnection } = await client.query({
      query: GET_ALL_POSTS,
    })

    return data.posts.nodes
  } catch (err) {
    console.log(err)
  }
}

export async function getAllPostsSlugs() {
  try {
    const client = getApolloClient()
    const { data }: { data: RootQueryToPostsSlugsConnection } =
      await client.query({
        query: GET_ALL_POSTS_SLUGS,
      })

    return data.posts.nodes
  } catch (err) {
    console.log(err)
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const client = getApolloClient()
    const { data }: { data: RootQueryToPostConnection } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: {
        slug,
      },
    })

    return data.postBy
  } catch (err) {
    console.log(err)
  }
}
