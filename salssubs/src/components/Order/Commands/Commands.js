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
            {props.menu.map((fillings, index) => {
            return <Command
                key={fillings.id}
                alt={fillings.alt}
                added={() => props.fillingAdded(fillings.id)}
                removed={() => props.fillingRemoved(fillings.id)}
            />
            })}
        </Grid>
    </Grid.Column>
  )
};

export default Commands;
