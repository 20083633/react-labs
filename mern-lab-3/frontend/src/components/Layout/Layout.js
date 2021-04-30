import React, { useCallback, useState, useEffect, Suspense } from "react";
import Loader from '../Feedback/Loader/Loader';
import { Container } from "semantic-ui-react";
import { Route, Switch, useHistory } from "react-router-dom";

import "./Layout.css";

import Nav from "../Nav/Nav";
import PizzaPal from "../../containers/PizzaPal/PizzaPal";
import AuthContext from "../../context/auth-context";

const YourOrders = React.lazy(() => import("../../containers/YourOrders/YourOrders"));
const PlaceOrder = React.lazy(() => import("../../containers/PlaceOrder/PlaceOrder"));
const OrderSuccess = React.lazy(() => import("../../containers/PlaceOrder/OrderSuccess/OrderSuccess"));
const Authenticate = React.lazy(() => import("../../containers/Authenticate/Authenticate"));
const YourAccount = React.lazy(() => import("../../containers/YourAccount/YourAccount"));
const AccountUpdate = React.lazy(() => import("../../containers/YourAccount/AccountUpdate/AccountUpdate"));


const Layout = (props) => {

  const [loggedInState, setLoggedInState] = useState({isLoggedIn: false});
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const history = useHistory;
  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
    history.push("/");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if ( storedData && storedData.token ) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={PizzaPal} />
        <Route path="/orders/:uid" component={YourOrders} />
        <Route path="/place-order" component={PlaceOrder} />
        <Route path="/order-success" component={OrderSuccess} />
        <Route path="/users/:uid" component={YourAccount} />
        <Route path="/update-account" component={AccountUpdate} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={PizzaPal} />
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
  );
};

export default Layout;
