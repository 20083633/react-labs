import React from "react";
import { Container } from 'semantic-ui-react';
import './Layout.css';
import Nav from '../Nav/Nav';


const Layout = (props) => {
  return (
    <Container>
      <Nav />
    </Container>
  )
};

export default Layout;
