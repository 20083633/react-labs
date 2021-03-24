import React from "react";
import { Container } from 'semantic-ui-react';
import './Layout.css';
import Nav from '../Nav/Nav';


const Layout = (props) => {
  return (
    <Container>
      <Nav />
      <main>
        {props.children}
      </main>
    </Container>
  )
};

export default Layout;
