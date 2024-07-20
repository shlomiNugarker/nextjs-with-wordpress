import { GET_ALL_USERS } from '@/queries/users'
import { getApolloClient } from './apollo-client'

export async function getAllUsers() {
  try {
    const apolloClient = getApolloClient()
    const { data }: { data: RootQueryToUsersConnection } =
      await apolloClient.query({
        query: GET_ALL_USERS,
      })
    return data.users.nodes
  } catch (err) {
    console.log(err)
  }
}

export async function getAuthorByNameSlug(name: string) {
  const users = await getAllUsers()
  const user = users?.find((user) => user.name === name)
  return user
}
