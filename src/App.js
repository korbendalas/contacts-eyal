import React from 'react';

import { BrowserRouter as Router, Switch, } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { RestLink } from "apollo-link-rest";
import { getToken } from './services/auth'
import { createBrowserHistory } from "history";
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

import Routes from './components/Routes'
import './App.css'
import 'antd/dist/antd.css';


const history = createBrowserHistory();
const baseURL = 'https://korbendalas-server-e-1.glitch.me/api';
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => console.log(`[GQL err]=> ${message} , Path : ${path}`))
  }
  if (networkError) {
    console.log(`[GQL Newtork error]=> ${networkError.message} , Operation: ${operation.operationName}`)
  }

})

const defaults = {
  person: [],
  
};


const authLink = setContext((_, { headers, ...rest }) => {
  const context = {
    ...rest,
    headers: {
      ...headers,
      "x-auth-token": getToken()

    }
  }
  return context;
})

const restLink = new RestLink({
  uri: baseURL,

});
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, restLink]),
  //link: restLink,
  cache: new InMemoryCache(),
 // disableOffline: true,
  //sconnectToDevTools: true,
  typeDefs: {}
});

function App() {

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router history={history}>
          <div>
            <Switch>
              <Routes />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}






export default App;
