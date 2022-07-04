import styled from "styled-components";
import { useEffect, useState } from "react";
import {ArrowDropUp,ArrowDropDown,Remove} from '@mui/icons-material';
import {colors} from "../../res/values/values"
//#region styles
const Accordion = styled.div`
  width: 90%;
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  font-weight: 300;
  margin-bottom:10px ;
`;
const MainItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center ;
  justify-content: space-between;
  cursor: pointer;
  color: ${colors.primaryColor};
  padding:2px 5px ;
  border-width: 1px;
  border-color: lightgray;
  border-style: solid;
  &:hover {
    background-color: ${colors.primaryColor};
    color:lightgray
  }
`;
//#endregion
function CheckOutAccordionMenu(props) {
  const [isActive, setIsActive] = useState(false);
  const [isActiveChange, setIsActiveChange] = useState(false);
  const data = props.item;
  useEffect(()=>{
    setIsActive(props.isActive)
    if(props.isActive) setIsActiveChange(true)
},[props.isActive])
  const changeIsActiveStatus =() =>{
    if(isActiveChange)
      setIsActive(!isActive)   
  }
  return (
    <Accordion>
      <MainItem onClick={() => changeIsActiveStatus()}>
        <div >{data.title}</div>
        <div> {(isActiveChange) ? (isActive ? <ArrowDropUp fontSize="large"/> : <ArrowDropDown fontSize="large"/>):(<Remove sx={{ color:'transparent' }}fontSize="large" />)}</div>
      </MainItem>
      {isActive &&
        data.content
      }
    </Accordion>
  );
}

export default CheckOutAccordionMenu;
