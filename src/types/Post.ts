interface Author {
  node: {
    id: string
    name: string
    slug: string
    description: string | null
    __typename: string
  }
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
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  modified: string
  status: string
  author: { node: Author }
  categories: { nodes: Category[]; __typename: string }
  tags: { nodes: Tag[]; __typename: string }
  featuredImage: { node: FeaturedImage; __typename: string } | null
  comments: { nodes: Comment[]; __typename: string }
  __typename: string
}

interface FeaturedImage {
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
