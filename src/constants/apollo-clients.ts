import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WS_URL } from "./urls";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(createClient({
  url: `ws://${WS_URL}/graphql`
}))

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export { client }