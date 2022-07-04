import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import CardContent from "../components/PagesComponents/CardContent";
import {useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../redux/actions/productActions";
import * as userActions from "../redux/actions/userActions";
import * as settingsActions from "../redux/actions/settingsActions";
const Container = styled.div``;
function Card(props) {
    const [loading,setLoading]=useState(true)
    const [currentProduct,setCurrentProduct]=useState({})
    let params = useParams();
  useEffect(()=>{
    const getProduct = async () => {
      let url = `http://localhost:3000/api/products/card/${params.productid}`
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setCurrentProduct(res.message.data[0]);
          setLoading(false);
        });
  
    }
    getProduct()
    /*
    props.actions.getSettings()
    const access_token = localStorage.getItem("access_token");
    if(access_token)
      props.actions.getUser()
    
    if(props.allProducts.length > 0){
      let product = props.allProducts.find(x=>{return x.itemno===params.productid})
      setCurrentProduct(product)
      setLoading(false)
    }else
      props.actions.getAllProducts()
      */
    
    
  },[])
  return (
    <Container>
      {(!loading) ? 
        <Container>
          <Header />
          <MenuBar />
          <Announcement />
           <CardContent key={currentProduct.product_id} product={currentProduct} />
          <Footer />
        </Container>
        :
        <Container/>
      }
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allProducts: state.allProductListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAllProducts: bindActionCreators(
        productActions.getSearchProducts,
        dispatch
      ),
      getUser : bindActionCreators(userActions.getUser,dispatch),
      getSettings:bindActionCreators(settingsActions.getSettings,dispatch)
    },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Card);
