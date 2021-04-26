import React, { useCallback, useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, useHistory } from "react-router-dom";

import "./Layout.css";

import Nav from "../Nav/Nav";
import PizzaPal from "../../containers/PizzaPal/PizzaPal";
import YourOrders from "../../containers/YourOrders/YourOrders";
import PlaceOrder from "../../containers/PlaceOrder/PlaceOrder";
import OrderSuccess from "../../containers/PlaceOrder/OrderSuccess/OrderSuccess";
import Authenticate from "../../containers/Authenticate/Authenticate";
import YourAccount from "../../containers/YourAccount/YourAccount";
import AccountUpdate from "../../containers/YourAccount/AccountUpdate/AccountUpdate";
import AuthContext from "../../context/auth-context";

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
        {routes}
      </Container>
    </AuthContext.Provider>
  );
};

export default Layout;
