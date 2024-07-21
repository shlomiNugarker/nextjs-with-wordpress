import { gql } from '@apollo/client'

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(where: {}) {
      nodes {
        uri
        slug
        id
        title

        parent {
          node {
            uri
            slug
            id
            ... on Page {
              title
            }
          }
        }

        children {
          nodes {
            uri
            slug
            id
            ... on Page {
              id
              title
            }
          }
        }
      }
    }
  }
`
export const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: String!) {
    pageBy(uri: $uri) {
      uri
      slug
      id
      title
      menuOrder
      content
      date
      modified
      status
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }

      parent {
        node {
          id
          slug
          uri
          ... on Page {
            title
          }
        }
      }

      children {
        nodes {
          slug
          uri
          id
          ... on Page {
            id
            title
          }
        }
      }
    }
  }
`
