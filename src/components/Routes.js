import React from 'react'
import Login from './Login';
import AddContact from './AddContact'
import Contacts from './Contacts';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { getToken, saveToken, removeToken } from '../services/auth';
import { LOGIN_MUTATION } from '../services/Query'
import { useMutation } from "@apollo/react-hooks";
import NavBar from './NavBar'

const AuthenticatedRoutes = () => (
    <Switch>
        <Route path="/contacts" component={Contacts} exact />
        <Route path="/contacts/add" component={AddContact} exact />
        <Route render={() => <Redirect to="/contacts" />} />
    </Switch>
);

const UnauthenticatedRoutes = (props) => (
    <Switch>
        <Route path="/login" component={() => <Login login={props.login} loginData={props.loginData} />} />
        <Route render={() => <Redirect to="/login" />} />
    </Switch>
);

const Routes = (props) => {

    const [authToken, setAuthToken] = React.useState(window.localStorage.getItem('jwtToken'))

    const [login, { data, error }] = useMutation(LOGIN_MUTATION);

    const token = data?.login?.token;

    const clearToken = () => {
        setAuthToken(null)
        removeToken();
    }

    React.useEffect(() => {
        if (token) {
            setAuthToken(token)
            saveToken(token);
        }

    }, [token])



    return (
        <div>
            <NavBar handleLogout={clearToken} />
            {authToken ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes login={login} loginData={data} />}
        </div>
    )
}

export default Routes;