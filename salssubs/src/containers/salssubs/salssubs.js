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

/*
    const [menuState, setMenuState] = useState({
        fillings: [
          { id: 0, name: 'meatballs', price: 2, image: 'images/fillings/meatballs.jpg', alt: 'Meatballs' },
          { id: 1, name: 'chicken', price: 1, image: 'images/fillings/chicken.webp', alt: 'Chicken' },
          { id: 2, name: 'steak', price: 1.5, image: 'images/fillings/steak.png', alt: 'Steak' },
          { id: 3, name: 'salami', price: 1, image: 'images/fillings/salami.png', alt: 'Salami' },
          { id: 4, name: 'ham', price: 1, image: 'images/fillings/ham.png', alt: 'Ham' },
          { id: 5, name: 'tuna', price: 1, image: 'images/fillings/tuna.png', alt: 'Tuna' },
          { id: 6, name: 'cheese', price: 0.75, image: 'images/fillings/cheese.jpg', alt: 'Cheese' },
          { id: 7, name: 'lettuce', price: 0.5, image: 'images/fillings/lettuce.jpg', alt: 'Lettuce' },
          { id: 8, name: 'tomato', price: 0.5, image: 'images/fillings/tomato.png', alt: 'Tomato' },
          { id: 9, name: 'onion', price: 0.5, image: 'images/fillings/onion.png', alt: 'Onion' },
          { id: 10, name: 'olive', price: 0.5, image: 'images/fillings/olive.png', alt: 'Olive' },
          { id: 11, name: 'jalapeno', price: 0.5, image: 'images/fillings/jalapeno.jpg', alt: 'Jalapeno' },
          { id: 12, name: 'cucumber', price: 0.5, image: 'images/fillings/cucumber.webp', alt: 'Cucumber' },
          { id: 13, name: 'ranch', price: 1, image: 'images/fillings/ranch.jpg', alt: 'Ranch Sauce' },
          { id: 14, name: 'bbq', price: 0.75, image: 'images/fillings/bbq.jpg', alt: 'BBQ Sauce' },
          { id: 15, name: 'hot', price: 0.75, image: 'images/fillings/hot.webp', alt: 'Hot Sauce' },
          { id: 16, name: 'mayo', price: 0.65, image: 'images/fillings/mayo.png', alt: 'Mayo'},
        ]
      });
*/
      const [orderState, setOrderState] = useState({
        totalPrice: 5, 
        chosenFillings: []
      });
      
      const addFillingHandler = (id) => {
        // find the chosen topping in the menu
        const menuIndex = menuState.fillings.findIndex(filling => filling.id === id);
  
      // check if the topping has already been added to the orderToppings array
      const orderIndex = orderFillings.findIndex(filling => filling.id === id);
  
      // if so, increase its count by 1
      if (orderIndex > -1){
        orderFillings[orderIndex].count++;
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
        orderFillings.push(chosenFilling);
      }
  
      // Calculate the new price
      const newPrice = orderState.totalPrice + menuState.fillings[menuIndex].price;
  
      // Update the order state with the new price and updated toppings array
      setOrderState({
        totalPrice: newPrice,
        chosenFillings: orderFillings
      });
    }

    const removeFillingHandler = (id) => {
      // Find topping with matching id from the orderToppings
      const index = orderFillings.findIndex(filling => filling.id === id);
  
      // Get the current price
      let price = orderState.totalPrice; 
  
      // If topping was found, update the price and decrease the count
      if(index >= 0){
        price = price - orderFillings[index].price;
        orderFillings[index].count--;
  
        // If the count is now 0, remove the topping completely
        if(orderFillings[index].count < 1){
          orderFillings.splice(index, 1);
        }
      }
  
      // Update order state with updated price and updated toppings array
      setOrderState({
        totalPrice: price,
        chosenFillings: orderFillings
      });
    }   




const checkoutHandler = () => {

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
      // set order state and orderToppings back to starting values
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
