import React from "react";
import { Header, Segment, Image } from 'semantic-ui-react';

const Success = (props) => {
  return (
    <Segment color='red'>
    <Header as='h2' textAlign='center' color='red'>
      Your Order has been placed!
    </Header>
  
</Segment>
  )
};

export default Success;
