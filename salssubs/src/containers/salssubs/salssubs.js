import React, {useState} from 'react';
import Menu from '../../components/Menu/Menu';
import { Grid } from 'semantic-ui-react';
import Order from '../../components/Order/Order';


const SalsSubs = (props) => {

    const [menuState, setMenuState] = useState({
        toppings: [
          { id: 0, name: 'meatballs', price: 2, image: 'images/toppings/meatballs.jpg', alt: 'Meatballs' },
          { id: 1, name: 'chicken', price: 1, image: 'images/toppings/chicken.webp', alt: 'Chicken' },
          { id: 2, name: 'steak', price: 1.5, image: 'images/toppings/steak.png', alt: 'Steak' },
          { id: 3, name: 'salami', price: 1, image: 'images/toppings/salami.png', alt: 'Salami' },
          { id: 4, name: 'ham', price: 1, image: 'images/toppings/ham.png', alt: 'Ham' },
          { id: 5, name: 'tuna', price: 1, image: 'images/toppings/tuna.png', alt: 'Tuna' },
          { id: 6, name: 'cheese', price: .75, image: 'images/toppings/cheese.jpg', alt: 'Cheese' },
          { id: 7, name: 'lettuce', price: .5, image: 'images/toppings/lettuce.jpg', alt: 'Lettuce' },
          { id: 8, name: 'tomato', price: .5, image: 'images/toppings/tomato.png', alt: 'Tomato' },
          { id: 9, name: 'onion', price: .5, image: 'images/toppings/onion.png', alt: 'Onion' },
          { id: 10, name: 'olive', price: .5, image: 'images/toppings/olive.png', alt: 'Olive' },
          { id: 11, name: 'jalapeno', price: .5, image: 'images/toppings/jalapeno.jpg', alt: 'Jalapeno' },
          { id: 12, name: 'cucumber', price: .5, image: 'images/toppings/cucumber.webp', alt: 'Cucumber' },
          { id: 13, name: 'ranch', price: 1, image: 'images/toppings/ranch.jpg', alt: 'Ranch Sauce' },
          { id: 14, name: 'bbq', price: .75, image: 'images/toppings/bbq.jpg', alt: 'BBQ Sauce' },
          { id: 15, name: 'hot', price: .75, image: 'images/toppings/hot.webp', alt: 'Hot Sauce' },
          { id: 16, name: 'mayo', price: .65, image: 'images/toppings/mayo.png', alt: 'Mayo'},
        ]
      });


  return (
          <Grid divided='vertically' stackable>
        <Grid.Row centered>
        <Menu menu={menuState.toppings} />
        </Grid.Row>
        <Grid.Row>
        <Order menu={menuState.toppings}/>
        </Grid.Row>
  </Grid>
  )
};

export default SalsSubs;
