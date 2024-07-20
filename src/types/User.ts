interface User {
  id: string
  name: string
  email: string | null
  slug: string
  description: string | null
  roles: any | null // ??
  avatar: {
    height: number
    width: number
    url: string
    __typename: string
  }
  __typename: 'User'
}

interface RootQueryToUsersConnection {
  users: {
    nodes: User[]
    __typename: 'RootQueryToUserConnection'
  }
}
