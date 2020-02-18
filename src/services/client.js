import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import { getToken } from "./auth";
import { setContext } from "apollo-link-context";
const baseURL = process.env.REACT_APP_API_URL;
const authLink = setContext((_, { headers, ...rest }) => {
  const context = {
    ...rest,
    headers: {
      ...headers,
      "x-auth-token": getToken()
    }
  };
  return context;
});

const restLink = new RestLink({
  uri: baseURL
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, restLink]),
  cache: new InMemoryCache(),
  typeDefs: {}
});

export default client;
