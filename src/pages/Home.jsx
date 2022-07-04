import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import MenuBar from "../components/MenuComponents/MenuBar";
import Carousel from "../components/Carousel";
import BrandsCarousel from "../components/BrandsCarousel";
const Container = styled.div``;
const Home = () => {
  return (
    <Container>
      <Header />
      <MenuBar />
      <Announcement />
      <ImageSlider type={"home"} />
      <Carousel />
      <BrandsCarousel />
      <Footer />
    </Container>
  );
};
export default Home;
