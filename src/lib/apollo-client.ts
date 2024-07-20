import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { removeLastTrailingSlash } from './util'

let client: ApolloClient<NormalizedCacheObject> | undefined

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!client) {
    client = _createApolloClient()
  }
  return client
}

export function _createApolloClient(): ApolloClient<NormalizedCacheObject> {
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
