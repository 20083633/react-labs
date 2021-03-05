import React from "react";
import { Header, List } from 'semantic-ui-react';

const OrderSummary = (props) => {
  return (
    <div>
          <Header as='h3'>
        Your Pizza: 
    </Header>
    <List divided verticalAlign='middle'>
        <List.Item>
            Mozzarella: 2
        </List.Item>
        <List.Item>
            Bacon: 1
        </List.Item>
        <List.Item>
            Salami: 1
        </List.Item>
        <List.Item>
            Onions: 1
        </List.Item>
    </List>
    </div>
  )
};

export default OrderSummary;
