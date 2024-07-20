interface Category {
  databaseId: number
  id: string
  name: string
  slug: string
  __typename: string
}

interface RootQueryToCategoryConnection {
  categories: { nodes: Category[] }
  __typename: string
}
