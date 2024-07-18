import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { removeLastTrailingSlash } from './util'

let client: ApolloClient<any> | undefined

export function getApolloClient(): ApolloClient<any> {
  if (!client) {
    client = _createApolloClient()
  }
  return client
}

export function _createApolloClient(): ApolloClient<any> {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(
        process.env.WORDPRESS_GRAPHQL_ENDPOINT as string
      ),
    }),
    cache: new InMemoryCache(),
    defaultOptions,
  })
}
