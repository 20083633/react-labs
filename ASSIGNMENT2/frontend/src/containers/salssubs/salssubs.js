import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";
import Menu from '../../components/Menu/Menu';
import { Grid, Message } from 'semantic-ui-react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Loader from '../../components/Feedback/Loader';
import ErrorModal from '../../components/Feedback/ErrorModal';


const SalsSubs = (props) => {
  const [menuState, setMenuState] = useState({
    fillings: []
  });

  const [errorState, setErrorState] = useState({
    error: false, 
    errorMessage: null
  });

  const [loadingState, setLoadingState] = useState({
    isLoading: true, 
    loadFailed: false
  });

  useEffect(() => {
    axios.get('/')
    .then(response => {
      let sortedFillings = response.data.fillings.sort(function(a, b){return a.id - b.id});
      setMenuState({fillings: sortedFillings});
    })
    .catch(error => {
      let errorMsg = '';
      if (error.response) {
          errorMsg = error.response.data.message;
      } else {
          errorMsg = 'There was a problem loading the menu';
      }

      setErrorState({error: true, errorMessage: errorMsg});
      setLoadingState({isLoading: false, loadFailed: menuState.loadFailed});
      console.log(error.response);
    });
  }, [])

const [orderState, setOrderState] = useState({
  totalPrice: 
    props.location.state ? 
    props.location.state.order.totalPrice : 5, 
  chosenFillings: 
    props.location.state ? 
    props.location.state.order.chosenFillings: []
});  

window.history.replaceState('/', undefined);


const addFillingHandler = (id) => {
  let order = {...orderState};

  // find the chosen topping in the menu
  const menuIndex = menuState.fillings.findIndex(filling => filling.id === id);

// check if the topping has already been added to the orderToppings array
const orderIndex = order.chosenFillings.findIndex(filling => filling.id === id);

// if so, increase its count by 1
if (orderIndex > -1){
  order.chosenFillings[orderIndex].count++;
}
// otherwise (i.e. this topping is being added for the first time)
// create this topping and add it to the order toppings array
else{
  // Save the id, name and price of the chosen topping; set its count to 1
  const chosenFilling = {
    id: menuState.fillings[menuIndex].id,
    name: menuState.fillings[menuIndex].alt,
    price: menuState.fillings[menuIndex].price,
    count: 1
  };
  order.chosenFillings.push(chosenFilling);
}

// Calculate the new price
const newPrice = orderState.totalPrice + menuState.fillings[menuIndex].price;

// Update the order state with the new price and updated toppings array
setOrderState({
  totalPrice: newPrice,
  chosenFillings: order.chosenFillings
});
}


// EVENT HANDLERS - REMOVE TOPPING

const removeFillingHandler = (id) => {

let order = {...orderState};

// Find topping with matching id from the orderToppings
const index = order.chosenFillings.findIndex(filling => filling.id === id);

// Get the current price
let price = order.totalPrice; 

// If topping was found, update the price and decrease the count
if(index >= 0){
  price = price - order.chosenFillings[index].price;
  order.chosenFillings[index].count--;

  // If the count is now 0, remove the topping completely
  if(order.chosenFillings[index].count < 1){
    order.chosenFillings.splice(index, 1);
  }
}

// Update order state with updated price and updated toppings array
setOrderState({
  totalPrice: price,
  chosenFillings: order.chosenFillings
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

} 

// ERROR HANDLER 

const errorHandler = () => {
  setErrorState({
    error: false, 
    errorMessage: null
  });
  setLoadingState({
    isLoading: false,
    loadFailed: true
  });
};

let checkoutDisabled = true;

if (orderState.chosenFillings.length > 0){
checkoutDisabled = false;
}


let salssubsMenu = 
errorState.error ? 
<ErrorModal error={errorState.errorMessage} onClear={errorHandler} /> : 
<Loader active={loadingState.isLoading} />;

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
else if (loadingState.loadFailed) {
salssubsMenu = <p>We're having some issues loading the menu... Please try again later.</p>
}

  return (
    <div>
      {salssubsMenu}
    </div>
  )
};

export default SalsSubs;
