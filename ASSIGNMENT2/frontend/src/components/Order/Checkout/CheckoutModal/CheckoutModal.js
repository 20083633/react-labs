import React, { useState } from "react";
import { Button, Modal } from 'semantic-ui-react';
import Summary from '../Summary/Summary';

const CheckoutModal = (props) => {
    const [open, setOpen] = useState(false);

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color='green' size='large'>Order Now!</Button>}
    >
        <Modal.Header>Confirm your choices:</Modal.Header>
        <Modal.Content>

          <Summary 
              menu = {props.menu}
              chosenFillings = {props.chosenFillings}
              totalPrice = {props.totalPrice}
          />

        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
              Go Back
          </Button>
          <Button color='green' disabled={props.disabled} onClick={ () => { props.checkout(); setOpen(false); } }>
      Check out
          </Button>
        </Modal.Actions>
  </Modal>
  )
};

export default CheckoutModal;
