interface Page {
  uri: string
  slug: string
  id: string
  title: string
  menuOrder: any | null //??
  content: string
  date: string
  modified: string
  status: string
  featuredImage: null
  author: {
    node: {
      name: string
      avatar: {
        url: string
        __typename: 'Avatar'
      }
      __typename: 'User'
    }
    __typename: 'NodeWithAuthorToUserConnectionEdge'
  }
  parent: any | null
  children: {
    nodes: any[]
    __typename: 'HierarchicalContentNodeToContentNodeChildrenConnection'
  }
  __typename: 'Page'
}

interface PageDataResponse {
  pageBy: Page
}

interface RootQueryToPagesConnection {
  pages: {
    nodes: {
      uri: string
      slug: string
      id: string
      title: string
      parent: {
        node: {
          uri: string
          slug: string
          id: string
          title: string
          __typename: 'Page'
        }
        __typename: 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
      } | null
      children: {
        nodes: {
          slug: string
          uri: string
          id: string
          title: string
          __typename: 'Page'
        }[]
        __typename: 'HierarchicalContentNodeToContentNodeChildrenConnection'
      }
      __typename: 'Page'
    }[]
  }
  __typename: 'RootQueryToPageConnection'
}
