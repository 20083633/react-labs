import React, { useState, useEffect } from "react";
import { Grid, Message } from 'semantic-ui-react';

import Menu from '../../components/Menu/Menu';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

const PizzaPal = (props) => {

  const [menuState, setMenuState] = useState({
    toppings: [],
    error: false
  });

  useEffect(() => {
      axios.get('/toppings.json')
      .then(response => {
        setMenuState({toppings: response.data});
      })
      .catch(error => {
        setMenuState({toppings: menuState.toppings, error: true});
        console.log(error);
      });
  }, [])

  // ORDER STATE

  // Set order state conditionally - either to old order state or starting state

  const [orderState, setOrderState] = useState({
    totalPrice: 
      props.location.state ? 
      props.location.state.order.totalPrice : 5, 
    chosenToppings: 
      props.location.state ? 
      props.location.state.order.chosenToppings: []
  });  

  // reset location state to undefined when app is reloaded (clears out old order)

  window.history.replaceState('/', undefined);


  const addToppingHandler = (id) => {
    let order = {...orderState};

    // find the chosen topping in the menu
    const menuIndex = menuState.toppings.findIndex(topping => topping.id === id);

  // check if the topping has already been added to the orderToppings array
  const orderIndex = order.chosenToppings.findIndex(topping => topping.id === id);

  // if so, increase its count by 1
  if (orderIndex > -1){
    order.chosenToppings[orderIndex].count++;
  }
  // otherwise (i.e. this topping is being added for the first time)
  // create this topping and add it to the order toppings array
  else{
    // Save the id, name and price of the chosen topping; set its count to 1
    const chosenTopping = {
      id: menuState.toppings[menuIndex].id,
      name: menuState.toppings[menuIndex].alt,
      price: menuState.toppings[menuIndex].price,
      count: 1
    };
    order.chosenToppings.push(chosenTopping);
  }

  // Calculate the new price
  const newPrice = orderState.totalPrice + menuState.toppings[menuIndex].price;

  // Update the order state with the new price and updated toppings array
  setOrderState({
    totalPrice: newPrice,
    chosenToppings: order.chosenToppings
  });
}


// EVENT HANDLERS - REMOVE TOPPING

const removeToppingHandler = (id) => {

  let order = {...orderState};

  // Find topping with matching id from the orderToppings
  const index = order.chosenToppings.findIndex(topping => topping.id === id);

  // Get the current price
  let price = order.totalPrice; 

  // If topping was found, update the price and decrease the count
  if(index >= 0){
    price = price - order.chosenToppings[index].price;
    order.chosenToppings[index].count--;

    // If the count is now 0, remove the topping completely
    if(order.chosenToppings[index].count < 1){
      order.chosenToppings.splice(index, 1);
    }
  }

  // Update order state with updated price and updated toppings array
  setOrderState({
    totalPrice: price,
    chosenToppings: order.chosenToppings
  });
} 

  let checkoutDisabled = true;

  if (orderState.chosenToppings.length > 0){
    checkoutDisabled = false;
  }

  console.log(props);

  const checkoutHandler = () => {

    props.history.push({
      pathname: 'place-order', 
      state: {
        order: orderState, 
        menu: menuState.toppings
      }
    });

  }

  let pizzapalMenu = menuState.error ? <Message><p>Pizza Pal menu can't be loaded!</p></Message> : <Message><p>Menu loading...</p></Message>;

  if (menuState.toppings.length > 0) {
    pizzapalMenu = (
      <Grid divided='vertically' stackable>
          <Grid.Row centered>
              <Menu menu={menuState.toppings} />
          </Grid.Row>
          <Order 
            menu={menuState.toppings}
            toppingAdded={addToppingHandler}
            toppingRemoved={removeToppingHandler}
            chosenToppings={orderState.chosenToppings}
            totalPrice={orderState.totalPrice}
            checkout={checkoutHandler}
            disabled={checkoutDisabled}
          />
      </Grid>
    );
  }

  return (
    <div>{pizzapalMenu}</div>
  )
};

export default PizzaPal;
