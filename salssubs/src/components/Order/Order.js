import React from "react";
import { Grid } from 'semantic-ui-react';
import Commands from './Commands/Commands';
import Checkout from './Checkout/Checkout';

const Order = (props) => {
  return (
    <Grid.Row columns={2} centered>
        <Commands menu={props.menu}/>
        <Checkout />
    </Grid.Row>
  )
};

export default Order;
