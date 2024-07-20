interface Category {
  databaseId: number
  id: string
  name: string
  slug: string
  __typename: string
}

interface RootQueryToCategoriesConnection {
  categories: { nodes: Category[] }
  __typename: string
}

interface RootQueryToCategoryConnection {
  category: {
    databaseId: number
    id: string
    name: string
    slug: string
    __typename: 'Category'
  }
}
