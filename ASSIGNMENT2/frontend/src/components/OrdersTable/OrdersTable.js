import React from "react";
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow/TableRow'; 

const OrdersTable = (props) => {

    return (
      <Table>
          <Table.Header>
          <Table.Row>
              <Table.HeaderCell width={4}>Order Date</Table.HeaderCell>
              <Table.HeaderCell width={8}>Sub Description</Table.HeaderCell>
              <Table.HeaderCell width={4}>Price</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
  
          <Table.Body>
  
              {props.orders.map((order) => {
                  return <TableRow 
                      key={order.id}
                      fillings={order.chosenFillings}
                      price={order.totalPrice}
                      date={order.date}
                  />
                  })}
  
          </Table.Body>
      </Table>
    )
  };

export default OrdersTable;
