import React from "react";
import { Grid } from 'semantic-ui-react';
import Commands from './Commands/Commands';
import Checkout from './Checkout/Checkout';

const Order = (props) => {
  return (
    <Grid.Row columns={2} centered>
        <Commands menu={props.menu}
        fillingAdded = {props.fillingAdded}
        fillingRemoved = {props.fillingRemoved}
        />
          <Checkout 
            menu = {props.menu}
            chosenFillings={props.chosenFillings}
            totalPrice={props.totalPrice}
            checkout={props.checkout}
            disabled={props.disabled}
          />
    </Grid.Row>
  )
};

export default Order;
