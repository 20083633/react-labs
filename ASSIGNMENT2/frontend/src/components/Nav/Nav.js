import React from "react";
import { Menu } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => {
  return (
    <div>
    <Menu color='green' stackable inverted>
    <Menu.Item>
      <img src='images/logo.png' alt='Sals Subs Logo' />
    </Menu.Item>

    <Menu.Item as={NavLink} to="/" exact>
      Sal's Subs
    </Menu.Item>

    <Menu.Item as={NavLink} to="/orders">
      Previous Orders
    </Menu.Item>

  </Menu>
    </div>
  )
};

export default Nav;