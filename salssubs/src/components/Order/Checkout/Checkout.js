import React from "react";
import { Grid, Header } from 'semantic-ui-react';
import Summary from './Summary/Summary';
import CheckoutModal from './CheckoutModal/CheckoutModal';

const Checkout = (props) => {
  return (
    <Grid.Column width={6} textAlign='right'>

        <Header as='h2' textAlign='center' className='step'>
            Step 2: Check out 
        </Header>

        <Summary
            menu = {props.menu}
            chosenFillings = {props.chosenFillings}
            totalPrice = {props.totalPrice}
        />
        <CheckoutModal 
            menu = {props.menu}
            chosenFillings = {props.chosenFillings}
            totalPrice = {props.totalPrice}
            checkout={props.checkout}
            disabled={props.disabled}
        />
    </Grid.Column>
  )
};

export default Checkout;
