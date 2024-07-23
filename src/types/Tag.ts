interface RootQueryToTagConnection {
  tags: {
    nodes: {
      id: string
      name: string
      slug: string
      description: any
      count: number
      __typename: 'Tag'
    }[]
    __typename: 'RootQueryToTagConnection'
  }
}
