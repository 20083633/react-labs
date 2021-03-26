import React from "react";
import { Grid, Button, Icon } from 'semantic-ui-react';

const Command = (props) => {
  return (
    <Grid.Column mobile={4} computer={2} textAlign='center'>
    <p>{props.alt}</p>
    <Button.Group size='mini'>
        <Button color='blue' icon onClick={props.added}>
            <Icon name='plus' />
        </Button>
        <Button color='red' icon>
            <Icon name='minus' />
        </Button>
    </Button.Group>
</Grid.Column>
  )
};

export default Command;
