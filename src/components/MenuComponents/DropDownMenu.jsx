import styled from "styled-components";
import { useState } from "react";
import {colors} from "../../res/values/values"
import MobileMenuBarContent from "../MenuComponents/MobileMenuBarContent";
//#region styles
const Container = styled.div`
`;
const MenuItem = styled.div`
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const MenuItemContent = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
  top: 2rem;
  z-index: 9997;
  min-height: 40vh;
  max-height:50vh ;
  overflow-y: scroll;
  white-space: nowrap;
  
  & a {
    color: ${colors.primaryColor};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-bottom: 1px solid #e5e5e5;
  }
  & a:hover {
     background-color: ${colors.primaryColor}; 
     color: lightgray;
  }
`;
//#endregion
const DropDownMenu = (props) => {
  const [menuToggle, setmenuToggle] = useState(false);
  const onMouseClickHandler = () => {
    setmenuToggle(true)
  };
  const onMouseEnterHandler = () => {
    setmenuToggle(true)
  };
  const onMouseLeaveHandler = () => {
    setmenuToggle(false);
  };
  return (
    <Container>
      <MenuItem
        style={{
          flexDirection: props.flexDirection,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          
        }}
        onMouseOver={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        //onClick={onMouseClickHandler}
      >
        {props.icon !== undefined && props.icon}
        <p>{props.text}</p>
      </MenuItem>
      <MenuItemContent
        onMouseOver={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        //onClick={onMouseLeaveHandler}
        style={{
          width: props.contentWidth,
          display: menuToggle ? "block" : "none",
          right: props.right !== undefined ? props.right : "",
          left: props.left !== undefined ? props.left : "",
          top: props.top !== undefined ? props.top : "",
          minHeight: props.minHeight !== undefined ? props.minHeight : "",
          
        }}
      >
        {
          (props.contentLinks==="mobileMenu") ?
          <MobileMenuBarContent close={onMouseLeaveHandler}/>
          :
          props.contentLinks
        }
      </MenuItemContent>
    </Container>
  );
};

export default DropDownMenu;
