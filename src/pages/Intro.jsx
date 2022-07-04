import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import IntroContent from "../components/PagesComponents/IntroContent";
const Container = styled.div``;
const Intro = () => {
  const sendMail = async (values)=>{
    let url = "http://localhost:3000/api/mail";
    let rv = false
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        mail:values.email,
        name:values.name,
        message:values.message
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        rv = true
      })
      . catch((err) => {
        rv = false
      });
      return rv
  }
  return (
    <Container>
      <Header />
      <MenuBar />
      <IntroContent sendMail={sendMail} />
      <Footer />
    </Container>
  );
};

export default Intro;
