import { gql } from '@apollo/client'

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment(
    $postId: ID!
    $authorName: String!
    $authorEmail: String!
    $content: String!
  ) {
    createComment(
      input: {
        commentOn: $postId
        author: $authorName
        authorEmail: $authorEmail
        content: $content
      }
    ) {
      success
      comment {
        id
        content
      }
    }
  }
`
