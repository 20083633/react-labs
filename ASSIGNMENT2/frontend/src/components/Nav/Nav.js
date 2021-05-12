import React, { useContext } from "react";
import { Menu } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import AuthContext from "../../context/auth-context";

const Nav = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div>
    <Menu color='green' stackable inverted>
    <Menu.Item>
      <img src='images/logo.png' alt='Sals Subs Logo' />
    </Menu.Item>

    <Menu.Item as={NavLink} to="/" exact>
      Sal's Subs
    </Menu.Item>

    {auth.isLoggedIn && (
        <Menu.Item as={NavLink} to={`/orders/${auth.userId}`}>
          Previous Orders
        </Menu.Item>
      )}

      {auth.isLoggedIn && (
        <Menu.Item as={NavLink} to={`/users/${auth.userId}`}>
          Your Account
        </Menu.Item>
      )}

{!auth.isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/authenticate">
            Signup/Login
          </Menu.Item>
        </Menu.Menu>
      )}

      {auth.isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/" onClick={auth.logout}>
            Log out
          </Menu.Item>
        </Menu.Menu>
      )}

  </Menu>
    </div>
  )
};

export default Nav;