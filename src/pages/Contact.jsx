import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import ContactContent from "../components/PagesComponents/ContactContent";
import {API_URL} from "../res/values/values"
const Container = styled.div``;
const Contact = () => {
    const sendMail = async (values)=>{
        let url = `${API_URL}/mail`;
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
      <ContactContent sendMail={sendMail} />
      <Footer />
    </Container>
  );
};

export default Contact;
