import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { removeLastTrailingSlash } from './util'

let client: ApolloClient<any> | undefined

// Function to get the existing Apollo Client or create a new one
export function getApolloClient(): ApolloClient<any> {
  if (!client) {
    client = _createApolloClient()
  }
  return client
}

// Function to create a new Apollo Client
export function _createApolloClient(): ApolloClient<any> {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache', // Do not cache watch queries
      errorPolicy: 'ignore', // Ignore errors in watch queries
    },
    query: {
      fetchPolicy: 'no-cache', // Do not cache queries
      errorPolicy: 'all', // Report all errors in queries
    },
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(
        process.env.WORDPRESS_GRAPHQL_ENDPOINT as string
      ),
    }),
    cache: new InMemoryCache(), // Use an in-memory cache for query results
    defaultOptions, // Apply the default options to the client
  })
}
