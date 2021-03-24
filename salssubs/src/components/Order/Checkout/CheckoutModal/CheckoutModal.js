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
    trigger={<Button color='blue' size='large'>Order Now!</Button>}
    >
        <Modal.Header>Confirm your choices:</Modal.Header>
        <Modal.Content>

          <Summary />

        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
              Go Back
          </Button>
          <Button color='blue' onClick={() => setOpen(false)}>
              Check out
          </Button>
        </Modal.Actions>
  </Modal>
  )
};

export default CheckoutModal;
