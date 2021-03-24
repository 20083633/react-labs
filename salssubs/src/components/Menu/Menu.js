import React from "react";
import { Grid, Header, Segment } from 'semantic-ui-react';
import MenuItem from './MenuSelects/MenuSelects';

const Menu = (props) => {
  return (
    <Grid.Column width={12}>
            <Segment color='green'>
            <Header as='h2' textAlign='center' color='green'>
                Sal's Subs Menu
            </Header>
        </Segment>
        <Grid>
            {props.menu.map((toppings, index) => {
            return <MenuItem 
                key={toppings.id}
                image={toppings.image}
                alt={toppings.alt}
                price={toppings.price}
            />
            })}
        </Grid>
    </Grid.Column>
  )
};

export default Menu;
