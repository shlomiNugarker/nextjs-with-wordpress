interface Author {
  id: string
  name: string
  slug: string
  description: string | null
  __typename: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

interface Comment {
  id: string
  content: string
  author: Author
  date: string
}

interface Post {
  [key: string]: any
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  modified: string
  status: string
  isSticky: boolean
  author: { node: Author }
  categories: { nodes: Category[]; __typename: string }
  tags: { nodes: Tag[]; __typename: string }
  featuredImage: { node: FeaturedImage; __typename: string } | null
  comments: { nodes: Comment[]; __typename: string }
  __typename: string
}

interface FeaturedImage {
  [key: string]: any
  sourceUrl: string
  title: string
  description: string | null
  altText: string
  caption: string | null
  srcSet: string | null
  sizes: string
  id: string
  __typename: string
}

interface RootQueryToPostsConnection {
  posts: { nodes: Post[] }
  __typename: string
}

interface RootQueryToPostsByCategoryIDConnection {
  posts: {
    nodes: { id: string; title: string; slug: string; __typename: 'Post' }[]
  }
  __typename: 'RootQueryToPostConnection'
}

interface RootQueryToPostConnection {
  postBy: Post
  __typename: string
}

interface RootQueryToPostsSlugsConnection {
  posts: {
    nodes: {
      [key: string]: any
      id: string
      title: string
      slug: string
      __typename: string
    }[]
  }
  __typename: string
}

interface RootQueryToPostsFromTagConnection {
  tags: {
    nodes: {
      id: string
      name: string
      posts: {
        nodes: {
          [key: string]: any
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          __typename: string
        }[]
        __typename: 'TagToPostConnection'
      }
      __typename: 'Tag'
    }[]
    __typename: 'RootQueryToTagConnection'
  }
}
