import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
import { colors } from "../../res/values/values";
//#region Styles
const CartDiv = styled.div`
  width:90% ;
  height: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #6e6e6e;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px;
  border-width:1px ;
  border-style:solid ;
  border-color:lightgray ;
`;

const CartTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const CartBody = styled.tbody`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const CartRow = styled.tr`
  height: 10px;
  letter-spacing: 1px;
`;
const CartHeaderCell = styled.td`
  padding: 10px;
  border: 1px solid lightgray;
  text-align: left;
`;
const CartRowCell = styled.td`
  padding: 10px;
  border: 1px solid lightgray;
  text-align: left;
  min-width: 30%;
`;
const MobileContent = styled.div`

  display: flex;
  flex-direction: column;
  color: #6e6e6e;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 10px;
  border-width:1px ;
  border-style:solid ;
  border-color:lightgray ;
`;
const MobileDescription = styled.div`
  color:${colors.primaryColor};
  margin-bottom:0.5rem ;
`;
const MobileInformation= styled.div`
  margin-left:0.5rem ;
`;
//#endregion
function OrderLineListComponent(props) {
  const { width } = useWindowWidthAndHeight();
  if(width < 768 ){
    return (
      <CartDiv>
        {props.lines.map((line, index) => {
              return (
                <MobileContent  key={index}>
                  <MobileDescription>{line.itemname}</MobileDescription>
                  <MobileInformation>@{line.itemunit} - {line.quantity.toFixed(2)} * £ {line.itemunitprice.toFixed(2)} -  £ {line.lineamount.toFixed(2)}</MobileInformation>
                </MobileContent>
               
              );
            })}
      </CartDiv>
  )
  }else{
    return (
      <CartDiv>
        <CartTable>
          <CartBody>
            <CartRow>
              <CartHeaderCell>Description</CartHeaderCell>
              <CartHeaderCell>Unit</CartHeaderCell>
              <CartHeaderCell>Quantity</CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
              Unit Price
              </CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
              Line Amount
              </CartHeaderCell>
            </CartRow>
          </CartBody>
         <CartBody>
            {props.lines.map((line, index) => {
              return (
                <CartRow key={index}>
                  <CartRowCell>{line.itemname}</CartRowCell>
                  <CartRowCell>{line.itemunit}</CartRowCell>
                  <CartRowCell>{line.quantity.toFixed(2)}</CartRowCell>
                  <CartRowCell style={{ textAlign: "right" }}>
                    £ {line.itemunitprice.toFixed(2)}
                  </CartRowCell>
                  <CartRowCell style={{ textAlign: "right" }}>
                    £ {line.lineamount.toFixed(2)}
                  </CartRowCell>
                </CartRow>
              );
            })}
          </CartBody>
        </CartTable>
      </CartDiv>
  )
  }
}

export default OrderLineListComponent;
