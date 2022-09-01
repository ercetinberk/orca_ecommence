import { useState,useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import ShoppingCartContent from "../components/PagesComponents/ShoppingCartContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as settingsActions from "../redux/actions/settingsActions";
import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";
const Container = styled.div`
  display:flex ;
  flex:1 ;
  flex-direction:column ;
  min-height: ${(props) => props.height}px;
  justify-content:space-between ;
`;
function ShoppingCart(props) {
  const { height } = useWindowWidthAndHeight();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  useEffect(()=>{
    props.actions.getSettings()
  },[])
  return (
    <Container height={height}>
      <div>
        <Header />
        <MenuBar />
      </div>
      <ShoppingCartContent/>
      <Footer />
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSettings:bindActionCreators(settingsActions.getSettings,dispatch)
    },
  };
}
export default connect(null,mapDispatchToProps)(ShoppingCart) ;
