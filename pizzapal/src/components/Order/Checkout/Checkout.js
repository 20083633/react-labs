import React from "react";
import { Grid, Header } from 'semantic-ui-react';
import OrderSummary from './OrderSummary/OrderSummary';
import OrderModal from './OrderModal/OrderModal';

const Checkout = (props) => {
  return (
    <Grid.Column width={6} textAlign='right'>

        <Header as='h2' textAlign='center' className='step'>
            Step 2: Check out 
        </Header>

        <OrderSummary />
        <OrderModal />
    </Grid.Column>
  )
};

export default Checkout;
