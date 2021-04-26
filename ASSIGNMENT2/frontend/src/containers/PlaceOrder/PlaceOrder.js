import React, { useState } from "react";
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import Summary from "../../components/Order/Checkout/Summary/Summary";
import { withRouter } from 'react-router-dom';




const PlaceOrder = (props) => {
    const [orderState, setOrderState] = useState({
        totalPrice: props.location.state.order.totalPrice, 
        chosenFillings: props.location.state.order.chosenFillings
      });  
      console.log(props);
  return (
          <Grid>
        <Grid.Row columns={2}>

            <Grid.Column width={6}>
                <Segment color='red'>
                    <Header as='h2' textAlign='center' color='red'>
                        Confirm your order:
                    </Header>
                    <Summary 
                        menu = {props.location.state.menu}
                        fillings = {orderState.chosenFillings}
                        price = {orderState.totalPrice}
                    />
                    <Button color="red">Go Back</Button>
                </Segment>
            </Grid.Column>

            <Grid.Column width={10}>
                <Segment color='red'>
                        <Header as='h2' textAlign='center' color='red'>
                            Enter your details:
                        </Header>
                        Form goes here
                    </Segment>
            </Grid.Column>

        </Grid.Row>
    </Grid>
  )
};

export default withRouter(PlaceOrder);
