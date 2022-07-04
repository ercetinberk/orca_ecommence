/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import TwoColumnContent from "../components/TwoColumnContent";

import {useSearchParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../redux/actions/productActions";
import * as userActions from "../redux/actions/userActions";
import * as settingsActions from "../redux/actions/settingsActions";
import * as manufacturerActions from "../redux/actions/manufacturerActions";
import * as categoryActions from "../redux/actions/categoryActions";
import * as countryActions from "../redux/actions/countryActions";

const Container = styled.div`min-height:40vw`;
function Saerch(props) {
  const [loading,setLoading]=useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryid,setCategoryId]=useState('')
  const [productid,setProductId]=useState('')
  const [filter,setFilter]=useState('')
  const [brand,setBrand]=useState('')
  const [country,setCountry]=useState('')
  useEffect(()=>{
    const renderPage = async ()=>{
      await  props.actions.getSettings()
      await props.actions.getManufacturers()
      await props.actions.getCategories()
      await props.actions.getCountryList()
      const access_token = localStorage.getItem("access_token");
      if(access_token)
       await  props.actions.getUser()
      setCategoryId(searchParams.get("categoryid"))
      setProductId(searchParams.get("productid"))
      setFilter(searchParams.get("filter"))
      setBrand(searchParams.get("brand"))
      setCountry(searchParams.get("country"))
      setLoading(false)
    }
    renderPage()
    
  },[searchParams,categoryid,productid,filter,brand,country])
  return (
    <Container>
      <Header />
      <MenuBar />
      <Announcement />
      {(!loading) ? 
        <Container> 
          <TwoColumnContent  categoryid={categoryid} productid={productid} filter={filter} brand={brand} country={country}/>
        </Container>
        :
        <Container/>
      }
      <Footer />
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeSearch: bindActionCreators(
        productActions.changeSearch,
        dispatch
      ),
      getUser : bindActionCreators(userActions.getUser,dispatch),
      getSettings:bindActionCreators(settingsActions.getSettings,dispatch),
      getManufacturers : bindActionCreators(manufacturerActions.getManufacturerList,dispatch),
      getCategories:bindActionCreators(categoryActions.getCategories,dispatch),
      getCountryList: bindActionCreators(
        countryActions.getCountryList,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    categories : state.categoryListReducer
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Saerch);
