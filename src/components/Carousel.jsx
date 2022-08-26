import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { KeyboardArrowLeftOutlined,KeyboardArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {colors} from "../res/values/values"
import { useNavigate } from "react-router-dom";
import useWindowWidthAndHeight  from "../utilities/hooks/useWindowWidthAndHeight";
import ProductCardView from "./ProductCardView";
//#region Styles
const BodyDiv = styled.div`
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin: 40px 10px;
`;
const Glider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 3px 15px -1px rgb(0 0 0 / 10%);
  padding: 10px 10px;
  border-bottom:1px solid #f2f2f2 ;
`;
const Glide= styled.div` 
  height: auto;
  transition: 0.5s;
  display:flex;
  flex-direction:row ;
  justify-content:center ;
  align-items:center ;
  min-width:100%;
  @media only screen and (min-width: 600px) {
    min-width:50%
  }
  @media only screen and (min-width: 900px) {
    min-width:30%
  }
  @media only screen and (min-width: 1200px) {
    min-width:23%
  }
  @media only screen and (min-width: 1324px) {
    min-width:20%
  }
`;
const RightButton = styled.div`
  z-index:2 ;
  position: absolute;
  color: ${(props) => (props.color === "black" ? "#000" : "#000")};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  top: ${(props) => props.heightPosition}%;
  right: ${(props) => props.widthPosition}%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.4);
  height: 35px;
`;
const LeftButton = styled.div`
  z-index:2 ;
  position: absolute;
  color: ${(props) => (props.color === "black" ? "#000" : "#000")};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  top: ${(props) => props.heightPosition}%;
  left: ${(props) => props.widthPosition}%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.4);
  height: 35px;
`;

const ViewAllButton = styled.button`
  width: auto;
  margin-top:20px ;
  margin-bottom:20px ;
  border: 1px solid ${colors.primaryColor};
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.primaryColor};
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color:${colors.primaryColor};
    color: white;
    cursor: pointer;
  }
`;
const Title = styled.span`
  width: auto;
  margin-top:20px ;
  margin-bottom:20px ;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.darkcolor};
  padding: 10px;
`;

//#endregion
function Carousal(props) {
  const [weboffers, setWebOffers] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  const { height, width } = useWindowWidthAndHeight();
  useEffect(() => {
    const getWebOffers = async () => {
        let url = `https://orca-ecommerce-api.herokuapp.com/api/products/weboffers?customerprice=${props.currentUser.customerpricegroup}`;
        await fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setWebOffers(res.message.data);
          });
      }
      getWebOffers()
  }, [props.currentUser]);

  const moveBehind = () => {
    console.log(width);
    const viewSize = (width < 600 ? 1 : (width < 900 ? 2 :(width < 1200 ? 3 :(width < 1324 ? 4 :5))));
    console.log(viewSize)
    value === -100 * (weboffers.length - viewSize)
      ? setValue(0)
      : setValue(value - 100);
  };
  const moveAhead = () => {
    
    const viewSize = (width < 600 ? 1 : (width < 900 ? 2 :(width < 1200 ? 3 :(width < 1324 ? 4 :5))));
    value === 0
      ? setValue(-100 * (weboffers.length - viewSize))
      : setValue(value + 100);
  };

  return (
    <BodyDiv>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Title>Web Offers</Title>
             <ViewAllButton onClick={()=> navigate('/route=search?filter=weboffers')}>View More Offers</ViewAllButton>
        </div>
        <LeftButton onClick={moveAhead} heightPosition={45} widthPosition={1}><KeyboardArrowLeftOutlined  fontSize="large" /></LeftButton>
        <RightButton onClick={moveBehind} heightPosition={45} widthPosition={1}><KeyboardArrowRightOutlined  fontSize="large"/></RightButton>
          
        <Glider width={width}>
            {
            weboffers.map((product, index) => {
                return (
                <Glide
                    key={index}
                    style={{ transform: `translateX(${value}%)` }}>
                      <ProductCardView key={product.itemno} product={product} viewType={"Grid"} />
                </Glide>
                );
            })
            }
        </Glider>
       
        
    </BodyDiv>
  );
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, null)(Carousal);
