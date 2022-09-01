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
import { colors } from "../res/values/values";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";
import LeftSide from "../components/LeftSide";
import Products from "../components/Products";


const Container = styled.div`
  display:flex ;
  flex:1 ;
  flex-direction:column ;
  min-height: ${(props) => props.height}px;
  justify-content:space-between ;
`;
const Row = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  margin:10px ;
  cursor: pointer;
  @media only screen and (min-width: 767px) {
    flex-direction: row;
  }
`;
const WaitDiv = styled.div`
  display:flex ;
  flex:1;
  flex-direction:column ;
  align-items: center;
  justify-content: center;
  & p {
    margin-top:0.8rem ;
  }
  & h3 {
    margin-top:0.8rem ;
    color:${colors.primaryColor};
  }
`;
const BreadCrumbTextHome = styled.a`
font-size: 0.9rem;
font-weight: 700;
color: ${colors.primaryColor};
padding: 5px;
border-width: 0px 0px 1px 0px;
border-color: lightgray;
border-style: solid;
@media only screen and (min-width: 768px) {
  border-width: 0px 1px 0px 0px;
  padding: 2px;
  margin-left: 10px;
  padding-right: 10px;
}
`;
const BreadCrumbText = styled.a`
font-size: 0.8rem;
font-weight: 500;
color: black;
padding: 5px;
border-width: 0px 0px 1px 0px;
border-color: lightgray;
border-style: solid;
@media only screen and (min-width: 768px) {
  border-width: 0px 1px 0px 0px;
  padding: 2px;
  margin-left: 10px;
  padding-right: 10px;
}
`;
const TwoColumnContainer = styled.div`
  display: flex;
  flex-direction:column ;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;
const ContainerLoading = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 2rem 0.5rem;
  align-items: center;
  min-height: 40vw;
`;
function Saerch(props) {
  const [loading,setLoading]=useState(true)
  const [productLoading,setProductLoading]=useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryid,setCategoryId]=useState('')
  const [productid,setProductId]=useState('')
  const [filter,setFilter]=useState('')
  const [brand,setBrand]=useState('')
  const [country,setCountry]=useState('')
  const [categoryDesc,setCategoryDesc]=useState('')
  const [productDesc,setProductDesc]=useState('')
  const navigate = useNavigate();
  const { height } = useWindowWidthAndHeight();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  useEffect(()=>{
    const renderPage = async ()=>{
      await props.actions.getSettings()
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
      props.categories.map(cat=>{
        if(cat.code===categoryid)
        setCategoryDesc(cat.description)
      })
      props.categories.map(subCat=>{
        if(subCat.code===productid)
        setProductDesc(subCat.description)
      })
      setProductLoading(false)
      setLoading(false)
    }
    setProductLoading(true)
    console.log('render SEARCH' + loading);
    renderPage()
    
  },[searchParams,categoryid,productid,filter,brand,country])
  return (
    <Container height={height}>
      <div>
        <Header />
        <MenuBar />
        <Announcement />
      </div>
      
      {(!loading) ? 
        <Container> 
        <Row>
            <BreadCrumbTextHome
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </BreadCrumbTextHome>
            {(categoryid) &&  <BreadCrumbText  > {categoryDesc} </BreadCrumbText>}
            {(productid) &&  <BreadCrumbText  > {productDesc} </BreadCrumbText>}
            {(brand) &&  <BreadCrumbText  > {brand} </BreadCrumbText>}
            {(filter) &&  <BreadCrumbText  > Search Results for " {filter} "</BreadCrumbText>}
            {(country) &&  <BreadCrumbText  > {country} </BreadCrumbText>}
          </Row>
          <TwoColumnContainer>
            <LeftSide categoryid={categoryid} productid={productid} filter={filter} brand={brand} country={country}/>
            {(!productLoading)?
                <Products categoryid={categoryid} productid={productid} filter={filter} brand={brand} country={country}/>
            :
            <ContainerLoading>
                <CircularProgress size={40} thickness={4}/>
            </ContainerLoading>
              
            }
          </TwoColumnContainer>
        </Container>
        :
        <ContainerLoading>
          <CircularProgress size={40} thickness={4}/>
        </ContainerLoading>
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

