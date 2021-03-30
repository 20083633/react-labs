import React from "react";
import { Header, List } from 'semantic-ui-react';

const Summary = (props) => {

let summary = null;

if(props.fillings.length > 0){
summary = (
        <div>
        <Header as='h3'>
            Your Sub: 
        </Header>

        <List divided verticalAlign='middle'>
            {props.fillings.map((filling) => {
                return( 
                    <List.Item key={filling.id}>
                        {filling.name}: {filling.count}
                    </List.Item>
                )
            })}
        </List>

        <Header as='h4' className='h4margin'>
            Total Price: &euro; {props.price.toFixed(2)}
        </Header>
    </div>
      );
  }
  else{
    summary = (
        <div>
            <Header as='h4' className="h4margin">
                Start adding some fillings! 
            </Header>
        </div>
    );
  }

  return (
    <div>
{summary}          
    </div>
  )
};

export default Summary;
