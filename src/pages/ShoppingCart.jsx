import { useState,useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import ShoppingCartContent from "../components/PagesComponents/ShoppingCartContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as settingsActions from "../redux/actions/settingsActions";

const Container = styled.div``;
function ShoppingCart(props) {
  useEffect(()=>{
    props.actions.getSettings()
  },[])
  return (
    <Container>
      <Header />
      <MenuBar />
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
