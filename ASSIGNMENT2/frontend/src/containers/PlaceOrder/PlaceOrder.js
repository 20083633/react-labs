import React, { useState } from "react";
import { Grid, Segment, Header, Button, Form, Select } from 'semantic-ui-react';
import Summary from "../../components/Order/Checkout/Summary/Summary";
import { withRouter } from 'react-router-dom';
import axios from '../../axios-orders';
import ErrorModal from '../../components/Feedback/ErrorModal';
// import { v4 as uuidv4 } from 'uuid';




const PlaceOrder = (props) => {

const [orderState, setOrderState] = useState({
totalPrice: props.location.state.order.totalPrice, 
chosenFillings: props.location.state.order.chosenFillings
});  


const [errorState, setErrorState] = useState({
error: false, 
errorMessage: null
});

const [customerState, setCustomerState] = useState({
details:{
    name: "",
    phone: "",
    method: "",
    address: ""
}
});

    const [validationState, setValidationState] = useState({
        rules: [
            {
                id: 'form-input-name',
                message: 'Please enter your name',
                required: true,
                valid: false
            },
            {
                id: 'form-input-phone',
                message: 'Please enter your phone number',
                required: true,
                valid: false
            },
            {
                id: 'form-input-method',
                message: 'Please choose collection or delivery',
                required: true,
                valid: false
            },
            {
                id: 'form-input-address',
                message: 'Please enter your delivery address',
                required: false,
                valid: true
            }
        ],
        formValid: false
    });

    const [messageState, setMessageState] = useState({
        name: null,
        phone: null,
        method: null,
        address: null
    });

      const cancelHandler = () => {
        props.history.push({
            pathname: '/', 
            state: {
              order: orderState, 
            }
          });
    };



    const validate = (value, inputIdentifier, inputType) => {
        // copy the validation state
        const validation = {...validationState};

        // find the rule for this input
        const inputRule = validation.rules.findIndex(input => input.id === inputIdentifier);

        let message = null;

        // check if it is required and also empty (for inputs only)
        if (validation.rules[inputRule].required && inputType === 'input' && value.trim() === '') {
            // get the error message and set valid to false
            message = validation.rules[inputRule].message;
            validation.rules[inputRule].valid = false;
        }
        else if (inputIdentifier === "form-input-name") {
            //check for a valid name (letters and spaces only)
    
            let pattern = /^[A-Za-z\s]{2,30}$/;
            let validName = pattern.test(value);
    
            if(validName){
                validation.rules[inputRule].valid = true;
            }
            else{
                validation.rules[inputRule].valid = false;
                message = validation.rules[inputRule].message;
            }
        }
        else if (inputIdentifier === "form-input-phone") {
            //check for a valid phone number
    
            let pattern = /^[+]?[(]?[0-9]{3,5}[)]?[-\s.]?[0-9]{6,7}$/;
            let validNum = pattern.test(value);
    
            if(validNum){
                validation.rules[inputRule].valid = true;
            }
            else{
                validation.rules[inputRule].valid = false;
                message = validation.rules[inputRule].message;
            }
        }
        else if (value === "Delivery") {
            //set address to required
            validation.rules[inputRule].valid = true; 
            validation.rules[3].valid = false;
            validation.rules[3].required = true;
        }
        else if (value === "Collection") {
            //set address to not required
            validation.rules[inputRule].valid = true; 
            validation.rules[3].required = false;
            validation.rules[3].valid = true;
        }
        else if (validation.rules[inputRule].required && inputIdentifier === "form-input-address") {
            //check for a valid address (alphanumeric plus some special characters)
    
            let pattern = /^[#.0-9a-zA-Z\s,-]{2,50}$/;
            let validAddress = pattern.test(value);
    
            if(validAddress){
                validation.rules[inputRule].valid = true;
            }
            else{
                validation.rules[inputRule].valid = false;
                message = validation.rules[inputRule].message;
            }
        }
        else {
            // otherwise reset the message and set valid back to true
            message = null;
            validation.rules[inputRule].valid = true;        
        }

        console.log(message);

        // update state
        setValidationState({rules: validation.rules, formValid: validation.formValid});

        let msgState = {...messageState};

        switch(inputIdentifier) {
            case "form-input-name":
                msgState.name = message;
                break;
            case "form-input-phone":
                msgState.phone = message;
                break;
            case "form-input-method":
                msgState.method = message;
                break;
            case "form-input-address":
                msgState.address = message;
                break;
            default:
              msgState = {...messageState};
          }

          setMessageState({...msgState});

              // check if the whole form is valid
    let formIsValid = true;

    // check if any of the fields are NOT valid
    for (let i in validation.rules){
        if(!validation.rules[i].valid){
            // and if so, set formIsValid to false
            formIsValid = false;
        }
    }

    console.log(formIsValid);

    // update state 
    setValidationState({rules: validation.rules, formValid: formIsValid});
    };

    const formChangedHandler = (event, inputIdentifier, inputType) => {

        let customerDetails = customerState.details;

        switch(inputIdentifier) {
            case "form-input-name":
                customerDetails.name = event.target.value;
                validate(event.target.value, inputIdentifier, inputType);
                break;
            case "form-input-phone":
                customerDetails.phone = event.target.value;
                validate(event.target.value, inputIdentifier, inputType);
                break;
            case "form-input-method":
                customerDetails.method = event.target.textContent;
                validate(event.target.textContent, inputIdentifier, inputType);
                break;
            case "form-input-address":
                customerDetails.address = event.target.value;
                validate(event.target.value, inputIdentifier, inputType);
                break;
            default:
              // code block
          }

        setCustomerState({details: customerDetails});
    }

    const checkoutHandler = () => {

        // get order from orderState
         let order = orderState;

         // add unique id
         //order.id = uuidv4();

         // create formatted date
         let orderDate = new Date();

         const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
         const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

         let dayNum = orderDate.getDay();
         let day = days[dayNum];

         let monthNum = orderDate.getMonth();
         let month = months[monthNum];

         let date = orderDate.getDate();
         let year = orderDate.getFullYear();

         // saves date in the format "Fri 19 Mar 2021"
         let formattedDate = day + " " + date + " " + month + " " + year;

         // add formattedDate to order
         order.date = formattedDate;

         // add customer details to order
         order.details = customerState.details;

         axios.post('/checkout', order)
         .then(response => {
            props.history.push('/success');
         })
         .catch(error => {
            console.log(error);

            let errorMsg = '';
            if (error.response) {
                errorMsg = error.response.data.message;
            } else {
                errorMsg = 'There was a problem creating your order';
            }
            setErrorState({error: true, errorMessage: errorMsg});
           });
     }

     let disabled = !validationState.formValid;

         // ERROR HANDLER

    const errorHandler = () => {
        setErrorState({
            error: false, 
            errorMessage: null
        });
    };

    // DISPLAY ERROR MODAL

    let orderForm = null;

    if (errorState.error){
    orderForm = <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />;
    }
    else{
        orderForm = (
    <Grid>
    <Grid.Row columns={2}>

        <Grid.Column width={6}>
            <Segment color='red'>
                <Header as='h2' textAlign='center' color='red'>
                    Confirm your order:
                </Header>
                <Summary 
                    menu = {props.location.state.menu}
                    chosenFillings = {orderState.chosenFillings}
                    totalPrice = {orderState.totalPrice}
                />
                <Button color="red" onClick={cancelHandler}>Go Back</Button>
            </Segment>
        </Grid.Column>

        <Grid.Column width={10}>
            <Segment color='red'>
                    <Header as='h2' textAlign='center' color='red'>
                        Enter your details:
                    </Header>
                    <Form>
                    <Form.Input
                        error={messageState.name}
                        required
                        label='Name'
                        placeholder='Name'
                        id='form-input-name'
                        onChange={(event) => formChangedHandler(event, 'form-input-name', 'input')}
                    />
                    <Form.Input
                        error={messageState.phone}
                        required
                        label='Phone'
                        placeholder='Phone'
                        id='form-input-phone'
                        onChange={(event) => formChangedHandler(event, 'form-input-name', 'input')}
                    />
                    <Form.Field
                        control={Select}
                        required
                        error={messageState.method}
                        label='Delivery method'
                        options={[
                            { key: 'c', text: 'Collection', value: 'collection' },
                            { key: 'd', text: 'Delivery', value: 'delivery' }
                        ]}
                        placeholder='Collection or Delivery'
                        id='form-input-method'
                        onChange={(event) => formChangedHandler(event, 'form-input-name', 'input')}
                    />
                    <Form.Input
                        error={messageState.address}
                        required={validationState.rules[3].required}
                        fluid
                        label='Address'
                        placeholder='Address'
                        id='form-input-address'
                        onChange={(event) => formChangedHandler(event, 'form-input-name', 'input')}
                    />
                    <Button type='submit' color='green' disabled={disabled} onClick={checkoutHandler}>Submit</Button>
                </Form>
                </Segment>
        </Grid.Column>

    </Grid.Row>
</Grid>
);
}

return (
<React.Fragment>
    {orderForm}
</React.Fragment>
)
};
export default withRouter(PlaceOrder);