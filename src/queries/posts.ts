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
        isSticky

        seo {
          metaDesc
          fullHead
          title
        }

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
export const GET_ALL_POSTS_SLUGS = gql`
  query GetAllPosts {
    posts {
      nodes {
        slug
        title
        id
      }
    }
  }
`
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      excerpt
      slug
      date
      modified
      status
      isSticky

      seo {
        metaDesc
        fullHead
        title
      }

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
`

export const GET_POSTS_BY_AUTHOR_SLUG = gql`
  query GetPostsByAuthorSlug($slug: String!) {
    posts(where: { authorName: $slug }) {
      nodes {
        slug
        title
        id
      }
    }
  }
`

export const GET_POSTS_BY_CATEGORY_ID = gql`
  query PostsByCategoryId($categoryId: Int!) {
    posts(where: { categoryId: $categoryId, hasPassword: false }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`

export const GET_POSTS_BY_TAG_NAME = gql`
  query GetPostsByTagName($name: String!) {
    tags(where: { search: $name }) {
      nodes {
        id
        name
        posts {
          nodes {
            id
            title
            slug
            excerpt
            content
          }
        }
      }
    }
  }
`
