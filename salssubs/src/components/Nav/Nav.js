import React from "react";
import { Menu } from 'semantic-ui-react';

const Nav = (props) => {
  return (
    <div>
    <Menu color='green' stackable inverted>
    <Menu.Item>
      <img src='images/logo.png' alt='Sals Subs Logo' />
    </Menu.Item>

    <Menu.Item active>
      Sal's Subs
    </Menu.Item>

    <Menu.Item>
      Previous Orders
    </Menu.Item>

  </Menu>
    </div>
  )
};

export default Nav;