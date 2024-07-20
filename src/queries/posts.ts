import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        modified
        status
        author {
          node {
            id
            name
            slug
            description
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            title
            description
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        comments {
          nodes {
            id
            content
            date
            author {
              node {
                id
                name
                email
              }
            }
          }
        }
      }
    }
  }
`
