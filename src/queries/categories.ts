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
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      databaseId
      id
      name
      slug
    }
  }
`
