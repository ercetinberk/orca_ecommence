import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import AboutContent from "../components/PagesComponents/AboutContent";
const Container = styled.div``;
const About = () => {
  return (
    <Container>
      <Header />
      <MenuBar />
      <AboutContent />
      <Footer />
    </Container>
  );
};

export default About;
