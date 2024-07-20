import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      nodes {
        id
        name
        email
        slug
        description
        roles {
          nodes {
            name
          }
        }
        avatar {
          height
          width
          url
        }
      }
    }
  }
`
