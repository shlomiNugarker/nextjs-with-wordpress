import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SLUGS,
  GET_POST_BY_SLUG,
  GET_POSTS_BY_AUTHOR_SLUG,
  GET_POSTS_BY_CATEGORY_ID,
  GET_POSTS_BY_TAG_NAME,
} from '@/queries/posts'
import { getApolloClient } from './apollo-client'
import { ApolloQueryResult } from '@apollo/client'

export async function getAllPosts() {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPostsConnection> =
      await client.query({
        query: GET_ALL_POSTS,
      })

    return data.posts.nodes
  } catch (err) {
    console.error(err)
  }
}

export async function getAllPostsSlugs() {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPostsSlugsConnection> =
      await client.query({
        query: GET_ALL_POSTS_SLUGS,
      })

    return data.posts.nodes
  } catch (err) {
    console.error(err)
  }
}
export async function getPostBySlug(slug: string) {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPostConnection> =
      await client.query({
        query: GET_POST_BY_SLUG,
        variables: {
          slug,
        },
      })

    return data.postBy
  } catch (err) {
    console.error(err)
  }
}
export async function getPostsByAuthorSlug(name: string) {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPostsSlugsConnection> =
      await client.query({
        query: GET_POSTS_BY_TAG_NAME,
        variables: {
          name,
        },
      })

    return data.posts.nodes
  } catch (err) {
    console.error(err)
  }
}

export async function getPostsByCategoryId(categoryId: number) {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToPostsByCategoryIDConnection> =
      await client.query({
        query: GET_POSTS_BY_CATEGORY_ID,
        variables: {
          categoryId,
        },
      })

    return data.posts.nodes
  } catch (err) {
    console.error(err)
  }
}

export async function getPostsByTagName(name: string) {
  try {
    const client = getApolloClient()
    const { data }: ApolloQueryResult<RootQueryToTagConnection> =
      await client.query({
        query: GET_POSTS_BY_TAG_NAME,
        variables: {
          name,
        },
      })

    return data.tags.nodes[0].posts.nodes
  } catch (err) {
    console.error(err)
  }
}
