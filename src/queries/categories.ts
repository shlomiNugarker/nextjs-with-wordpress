import { gql } from '@apollo/client'

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      nodes {
        databaseId
        id
        name
        slug
      }
    }
  }
`
