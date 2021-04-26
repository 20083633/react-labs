import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";
import Menu from '../../components/Menu/Menu';
import { Grid, Message } from 'semantic-ui-react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

let orderFillings = [];

const SalsSubs = (props) => {
  const [menuState, setMenuState] = useState({
    fillings: []
  });

  useEffect(() => {
    axios.get('/fillings.json')
    .then(response => {
      setMenuState({fillings: response.data, error: false});
    })
    .catch(error => {
      setMenuState({fillings: menuState.fillings, error: true});
      console.log(error);
    });
}, [])

const [orderState, setOrderState] = useState({
  totalPrice: 5, 
  chosenFillings: []
});

const addFillingHandler = (id) => {
  // find the chosen filling in the menu
  const menuIndex = menuState.fillings.findIndex(filling => filling.id === id);

// check if the filling has already been added to the orderFillings array
const orderIndex = orderFillings.findIndex(filling => filling.id === id);

// if so, increase its count by 1
if (orderIndex > -1){
  orderFillings[orderIndex].count++;
}
// otherwise (i.e. this filling is being added for the first time)
// create this filling and add it to the order fillings array
else{
  // Save the id, name and price of the chosen filling; set its count to 1
  const chosenFilling = {
    id: menuState.fillings[menuIndex].id,
    name: menuState.fillings[menuIndex].alt,
    price: menuState.fillings[menuIndex].price,
    count: 1
  };
  orderFillings.push(chosenFilling);
}

// Calculate the new price
const newPrice = orderState.totalPrice + menuState.fillings[menuIndex].price;

// Update the order state with the new price and updated fillings array
setOrderState({
  totalPrice: newPrice,
  chosenFillings: orderFillings
});
}

const removeFillingHandler = (id) => {
  // Find filling with matching id from the orderFillings
  const index = orderFillings.findIndex(filling => filling.id === id);

  // Get the current price
  let price = orderState.totalPrice; 

  // If filling was found, update the price and decrease the count
  if(index >= 0){
    price = price - orderFillings[index].price;
    orderFillings[index].count--;

    // If the count is now 0, remove the filling completely
    if(orderFillings[index].count < 1){
      orderFillings.splice(index, 1);
    }
  }

  // Update order state with updated price and updated fillings array
  setOrderState({
    totalPrice: price,
    chosenFillings: orderFillings
  });
}   

console.log(orderState);


const checkoutHandler = () => {
  props.history.push('/place-order');

  props.history.push({
    pathname: 'place-order', 
    state: {
      order: orderState, 
      menu: menuState.fillings
    }
  });
/*
    // get order from orderState
    let order = orderState;

    // add unique id
    order.id = uuidv4();

    // create formatted date
    let orderDate = new Date();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let dayNum = orderDate.getDay();
    let day = days[dayNum];

    let monthNum = orderDate.getMonth();
    let month = months[monthNum];

    let date = orderDate.getDate();
    let year = orderDate.getFullYear();

    // saves date in the format "Fri 19 Mar 2021"
    let formattedDate = day + " " + date + " " + month + " " + year;

    // add formattedDate to order
    order.date = formattedDate;

    axios.post('/orders.json', order)
    .then(response => {
      alert('Order saved!');
      // set order state and orderFillings back to starting values
      setOrderState({
        totalPrice: 5,
        chosenFillings: []
      });
      orderFillings=[];
  })
    .catch(error => {
    setMenuState({fillings: menuState.fillings, error: true});
    alert('Something went wrong :(');
    console.log(error);
    });
*/
} 

let checkoutDisabled = true;

if (orderState.chosenFillings.length > 0){
  checkoutDisabled = false;
}


let salssubsMenu = menuState.error ? <Message><p>Sals Subs menu can't be loaded!</p></Message> : <Message><p>Menu loading...</p></Message>;

if (menuState.fillings.length > 0) {
  salssubsMenu = (
      <Grid divided='vertically' stackable>
      <Grid.Row centered>
          <Menu menu={menuState.fillings} />
      </Grid.Row>
      <Order 
        menu={menuState.fillings}
        fillingAdded={addFillingHandler}
        fillingRemoved={removeFillingHandler}
        chosenFillings={orderState.chosenFillings}
        totalPrice={orderState.totalPrice}
        checkout={checkoutHandler}
        disabled={checkoutDisabled}
      />
      </Grid>
  );
}

  return (
    <div>
      {salssubsMenu}
    </div>
  )
};

export default SalsSubs;
