import * as React from 'react';
import styled from "styled-components";
import OrcaCustomSelect from "../Modal/OrcaCustomSelect"
import {colors} from "../../res/values/values"
//#region STYLES

const Container = styled.div`
  min-height:10rem ;
  padding:10px ;
  border-width:1px ;
  border-style:solid ;
  border-color:lightgray ;
`;
const ButtonContainer = styled.div`
  display  :flex ;
  flex-direction:row ;
  justify-content:flex-end ;
  margin-top:20px ;

`;
const Button = styled.div`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  background-color: ${colors.primaryColor};
  border-color: #dddddd #dddddd #b3b3b3 #b7b7b7;
  color: #fff;
  border-radius: 2px;
  margin: 2px;
  padding: 8px;
  cursor: pointer;
  &:hover{
    background-color:${colors.darkcolor} ;
  }
`;
//#endregion

export default function DeliveryDetailsComponent(props) {
  
    return (
      <Container>
        <OrcaCustomSelect value={(props.selectedAddress!=='')?props.selectedAddress : props.dropDownList[0].value} onChange={props.setSelectedAddress} data={props.dropDownList} />
        <ButtonContainer>
            <Button onClick={()=>{props.changeOpenStatus(true)}}>Continue</Button>
        </ButtonContainer>
      </Container>
    );
   
}
