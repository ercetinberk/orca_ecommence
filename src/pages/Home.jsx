import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import MenuBar from "../components/MenuComponents/MenuBar";
import Carousel from "../components/Carousel";
import BrandsCarousel from "../components/BrandsCarousel";
import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";
const Container = styled.div`
  display:flex ;
  flex:1 ;
  flex-direction:column ;
  min-height: ${(props) => props.height}px;
  justify-content:space-between ;
`;
const Home = () => {
  const { height } = useWindowWidthAndHeight();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <Container height={height}>
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
