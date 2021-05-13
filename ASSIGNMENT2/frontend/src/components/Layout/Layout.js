import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Container } from 'semantic-ui-react';
import { Route, Switch, useHistory } from "react-router-dom";
import Loader from '../Feedback/Loader';

import './Layout.css';

import Nav from '../Nav/Nav';
import SalsSubs from '../../containers/salssubs/salssubs';
import AuthContext from "../../context/auth-context";

const PreviousOrders = React.lazy(() => import  ('../../containers/PreviousOrders/PreviousOrders'));
const PlaceOrder = React.lazy(() => import  ('../../containers/PlaceOrder/PlaceOrder'));
const Success = React.lazy(() => import  ('../../containers/PlaceOrder/Success/Success'));
const Authenticate = React.lazy(() => import  ("../../containers/Authenticate/Authenticate"));
const Account = React.lazy(() => import  ("../../containers/Account/Account"));
const AccountUpdate = React.lazy(() => import  ("../../containers/Account/AccountUpdate/AccountUpdate"));


let logoutTimer;

const Layout = (props) => {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const history = useHistory();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
    history.push("/");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if ( storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={SalsSubs} />
        <Route path="/orders/:uid" component={PreviousOrders} />
        <Route path="/place-order" component={PlaceOrder} />
        <Route path="/success" component={Success} />
        <Route path="/users/:uid" component={Account} />
        <Route path="/update-account" component={AccountUpdate} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={SalsSubs} />
        <Route path="/authenticate" component={Authenticate} />
      </Switch>
    );
  }



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
    <Container>
      <Nav />
      <Suspense fallback={<div><Loader active='true' /></div>}>
    {routes}
    </Suspense>
    </Container>
    </AuthContext.Provider>
  )
};

export default Layout;
