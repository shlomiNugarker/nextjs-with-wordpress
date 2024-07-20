export interface Post {
  id: string
  title: string
  content: string
  slug: string
  date: string
  __typename?: string // Optional, depending on if you use GraphQL or similar
}
