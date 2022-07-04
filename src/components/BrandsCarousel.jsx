import React, { useState, useEffect } from "react";
import { KeyboardArrowLeftOutlined,KeyboardArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {colors} from "../res/values/values"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manufacturerActions from "../redux/actions/manufacturerActions";

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
  padding: 10px 10px;
  box-shadow: 0px 3px 15px -1px rgb(0 0 0 / 10%);
  border-bottom:1px solid #f2f2f2 ;
`;
const Glide= styled.div`
  min-width: 20%;
  height: auto;
  transition: 0.5s;
`;
const Poster= styled.img`
  width: 80%;
  height: 50%;
  border-radius: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  margin-top:10px ;
  margin-bottom:10px ;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.darkcolor};
  padding: 5px;
`;

//#endregion
function BrandsCarousel(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getBrands = async () => {
        if(props.manufacturers.length===0)
            await props.actions.getBrands()
      }
      getBrands()
  }, []);

  const moveBehind = () => {
    value === -100 * (props.manufacturers.length - 5)
      ? setValue(0)
      : setValue(value - 100);
  };
  const moveAhead = () => {
    console.log(value);
    value === 0
      ? setValue(-100 * (props.manufacturers.length - 5))
      : setValue(value + 100);
  };
  return (
    <BodyDiv>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Title>SHOP BY BRAND</Title>
        </div>
        <LeftButton onClick={moveAhead} heightPosition={60} widthPosition={1}><KeyboardArrowLeftOutlined  fontSize="large" /></LeftButton>
        <RightButton onClick={moveBehind} heightPosition={60} widthPosition={1}><KeyboardArrowRightOutlined  fontSize="large"/></RightButton>
          
        <Glider>
            {
            props.manufacturers.map((brand, index) => {
                return (
                <Glide
                    key={index}
                    style={{ transform: `translateX(${value}%)` }}>
                        <Poster
                            key={brand.code}
                            className="poster"
                            src={`./catalog/Brands/${brand.code}.png`}
                        />
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
      manufacturers: state.manufacturerReducer,
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        getBrands : bindActionCreators(manufacturerActions.getManufacturerList,dispatch),
      },
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(BrandsCarousel) ;
