import styled from "styled-components";
import { useState } from "react";
import {colors} from "../../res/values/values"
//#region styles
const Accordion = styled.div`
`;
const MainItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.1em;
  letter-spacing: 1.5px;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  color:${colors.primaryColor};
  padding: 1rem;
  border-width: 1px 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const SubItem = styled.div`
  background-color: white;
  padding: 5px 15px;
  font-weight: 300;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;
//#endregion
function CartAccordionMenu(props) {
  const [isActive, setIsActive] = useState(false);
  const data = props.item;

  return (
    <Accordion>
      <MainItem onClick={() => setIsActive(!isActive)}>
        <div>{data.title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </MainItem>
      {isActive &&
        data.content.map((value,index) => {
          return <SubItem  key={index}> - {value}</SubItem>;
        })}
    </Accordion>
  );
}

export default CartAccordionMenu;
