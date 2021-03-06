/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_KEY } from "../res/values/values";
import ChargeContent from "../components/PagesComponents/ChargeContent";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from "../res/values/values";
const Container = styled.div`
  align-items: center;
  width:20rem ;
  min-height:20rem ;
 
`;
const Payment = styled.div`
   
    width:100% ;
    & p {
        color:${colors.primaryColor};
        font-size:1.4rem ;
        font-weight:600 ;
        text-align:center ;
    }
 
`;
const Charge = ({totalPayment,confirmOrderWithPayment,user}) => {
  const [status, setStatus] = useState("wait");

  const [options, setOptions] = useState({});
  const stripePromise = loadStripe(STRIPE_KEY);
  let test =""
  const appearance = {
    theme: "stripe",
  };
  useEffect(() => {
    const getClinetSecret = async () => {
      try {
        let url = "http://localhost:3000/api/charge/secure";
        await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ amount: totalPayment()*100 }),
        })
          .then((res) => res.json())
          .then((res) => {
            test =res.id
          
            setOptions({
              clientSecret: res.client_secret,
              appearance: appearance,
            });
            setStatus("ready");
          })
          .catch((err) => {
            let error = JSON.parse(err.message);
            console.log("CATCH : " + error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getClinetSecret();
    return () => {
      if (status !== "success") cancelPayment();
    };
  }, []);
  const cancelPayment = async () => {
    try {
      
      let url = "http://localhost:3000/api/charge/cancel";
      await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: test }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          let error = JSON.parse(err.message);
          console.log("CATCH : " + error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      {status === "ready" ? (
        <Elements stripe={stripePromise} options={options}>
           <Payment><p>Total : ?? {totalPayment()}</p></Payment> 
          <ChargeContent
            totalPayment={totalPayment}
            confirmOrderWithPayment={confirmOrderWithPayment}
            user={user}
          />
        </Elements>
      ) : (
        <div>
            <CircularProgress></CircularProgress>
        </div>
      )}
    </Container>
  );
};
export default Charge;
