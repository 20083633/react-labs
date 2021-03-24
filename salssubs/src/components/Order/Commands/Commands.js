import React from "react";
import { Grid, Header } from 'semantic-ui-react';
import Command from './Command/Command';

const Commands = (props) => {
  return (
    <Grid.Column width={8}>
        <Header as='h2' textAlign='center' className='step'>
            Step 1: Choose your fillings
        </Header>
        <Grid>
            {props.menu.map((toppings, index) => {
            return <Command
                key={toppings.id}
                alt={toppings.alt}
            />
            })}
        </Grid>
    </Grid.Column>
  )
};

export default Commands;
