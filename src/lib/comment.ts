import { ADD_COMMENT_MUTATION } from '@/queries/comment'
import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { getApolloClient } from './apollo-client'

export async function addCommentToPost(
  client: ApolloClient<NormalizedCacheObject>,
  postId: string,
  authorName: string,
  authorEmail: string,
  content: string
) {
  try {
    const client = getApolloClient()

    const res: FetchResult<any> = await client.mutate({
      mutation: ADD_COMMENT_MUTATION,
      variables: {
        postId: postId,
        authorName: authorName,
        authorEmail: authorEmail,
        content: content,
      },
    })

    if (res.data.createComment.success) {
      console.log('Comment added successfully!', res.data.createComment.comment)
      return res.data.createComment.comment
    } else {
      console.error('Failed to add comment')
    }
  } catch (err) {
    console.log(err)
  }
}
