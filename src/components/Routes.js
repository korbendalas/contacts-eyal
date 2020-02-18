import React from "react";
import Login from "./Login";
import AddContact from "./AddContact";
import Contacts from "./Contacts";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";

import { useAuth } from "../auth-context";

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path="/contacts" component={Contacts} exact />
    <Route path="/contacts/add" component={AddContact} exact />
    <Route render={() => <Redirect to="/contacts" />} />
  </Switch>
);

const UnauthenticatedRoutes = props => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route render={() => <Redirect to="/login" />} />
  </Switch>
);

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <NavBar />
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </div>
  );
};

export default Routes;
