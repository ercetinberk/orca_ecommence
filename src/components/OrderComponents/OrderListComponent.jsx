import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { colors } from "../../res/values/values";
import { ViewList } from "@material-ui/icons";
import {getFormattedDate} from "../../utilities/helpers"
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
//#region Styles
const CartDiv = styled.div`
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
const CartRowButtonCell = styled.td`
  padding: 5px;
  border: 1px solid lightgray;
  text-align: left;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;
//#endregion
function OrderListComponent(props) {
  const navigate = useNavigate();
  const { width } = useWindowWidthAndHeight();
  if(width < 768 ){
    return (
      <CartDiv>
        <CartTable>
          <CartBody>
            <CartRow>
              <CartHeaderCell>Order Date</CartHeaderCell>
              <CartHeaderCell>Delivery Method</CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
              Total Amount 
              </CartHeaderCell>
            </CartRow>
          </CartBody>
          <CartBody>
            {props.orders.map((order, index) => {
              return (
                <CartRow key={index}>
                  <CartRowCell>{getFormattedDate(order.orderdate)}</CartRowCell>
                  <CartRowCell>{order.deliverymethod}</CartRowCell>
                  <CartRowCell style={{ textAlign: "right" }}>
                    £ {order.amount.toFixed(2)}
                  </CartRowCell>
                  <CartRowButtonCell  
                      style={{ textAlign: "center" }}
                      onClick={()=>{navigate(`/route=account/order?id=${order.documentno}&type=${props.type}`)}} 
                  ><ViewList></ViewList></CartRowButtonCell>
                </CartRow>
              );
            })}
          </CartBody>
        </CartTable>
      </CartDiv>
  );
  }else{
    return (
      <CartDiv>
        <CartTable>
          <CartBody>
            <CartRow>
              <CartHeaderCell>Document No</CartHeaderCell>
              <CartHeaderCell>Customer Name</CartHeaderCell>
              <CartHeaderCell>Delivery Method</CartHeaderCell>
              <CartHeaderCell>Order Date</CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
              Total Amount 
              </CartHeaderCell>
            </CartRow>
          </CartBody>
          <CartBody>
            {props.orders.map((order, index) => {
              return (
                <CartRow key={index}>
                  <CartRowCell>{order.documentno}</CartRowCell>
                  <CartRowCell>{order.customername}</CartRowCell>
                  <CartRowCell>{order.deliverymethod}</CartRowCell>
                  <CartRowCell>{getFormattedDate(order.orderdate)}</CartRowCell>
                  <CartRowCell style={{ textAlign: "right" }}>
                    £ {order.amount.toFixed(2)}
                  </CartRowCell>
                  <CartRowButtonCell  
                      style={{ textAlign: "center" }}
                      onClick={()=>{navigate(`/route=account/order?id=${order.documentno}&type=${props.type}`)}} 
                  ><ViewList></ViewList></CartRowButtonCell>
                  
                </CartRow>
              );
            })}
          </CartBody>
        </CartTable>
      </CartDiv>
  );
  }
  
}

export default OrderListComponent;
