import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import styled from "styled-components";
import {colors} from "../../res/values/values"
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
const Container = styled.div`
  flex-direction:column ;
  justify-content:space-between ;
  align-items:center ;
  width:20rem ;
 
`;
const Wait = styled.div`
    flex-direction:column ;
    justify-content:center ;
    align-items:center ;
    width:100% ;
    background-color:red ;
`;
const CreditCardDiv = styled.div`
  padding:10px ;
  border: 1px;
  border-color: lightgray;
  border-style: solid;
  margin: 5px 0;
`;
const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: ${colors.primaryColor};
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const ChargeContent = ({totalPayment,confirmOrderWithPayment,user}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true)
    let addressValue = user.address.split(',')
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3001",
        
        payment_method_data: {
          billing_details:  {
            name: user.name,
            email: user.email,
            address: {
              city: addressValue[2],
              country: "GB",
              line1: addressValue[1],
              postal_code: addressValue[3],
            },
            phone: user.telephone,
          }
        }
      },
      redirect: "if_required"
    })
    if (error) {
      setErrorMessage(error.message);
    } else {
      await confirmOrderWithPayment()
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <CreditCardDiv>
          <PaymentElement />
        </CreditCardDiv>
        
        <Button disabled={!stripe}>Pay ( £ {totalPayment()} ) </Button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
        {paymentLoading && <Wait><LinearProgress/></Wait>} 
        
        </Form>
    </Container>
    
  )
};

export default ChargeContent;