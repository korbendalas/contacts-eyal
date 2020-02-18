import React from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { ApolloProvider } from "react-apollo";

import { createBrowserHistory } from "history";
import apolloClient from "./services/client";
import Routes from "./components/Routes";
import { AuthProvider } from "./auth-context";
import "./App.css";
import "antd/dist/antd.css";

const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ApolloProvider client={apolloClient}>
          <Router history={history}>
            <Switch>
              <Routes />
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
