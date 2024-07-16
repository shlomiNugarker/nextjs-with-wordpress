import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { removeLastTrailingSlash } from './util';

let client: ApolloClient<any> | undefined;

/**
 * getApolloClient
 */
export function getApolloClient(): ApolloClient<any> {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */
export function _createApolloClient(): ApolloClient<any> {
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT as string),
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
  });
}
