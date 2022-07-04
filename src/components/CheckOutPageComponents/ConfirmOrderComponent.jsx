import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { colors } from "../../res/values/values";
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
const CartRowEmptyCell = styled.td`
  padding: 10px;
  border: 1px 1px 1px 2px solid lightgray;
  text-align: left;
  min-width: 30%;
`;
const CartFooter = styled.div`
  margin-top:20px ;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const CartButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-end ;
  align-items:center ;
`;
const CartButton = styled.div`
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
function ConfirmOrderComponent(props) {
  const navigate = useNavigate();
  const { width } = useWindowWidthAndHeight();
  const getTotalAmount = () => {
    let totalAmountInclVat = 0;
    props.cart.map((item) => (totalAmountInclVat += item.lineamountinclvat));
    return totalAmountInclVat.toFixed(2);
  };
  if(width < 768 ){
    return (
      <CartDiv>
        {props.cart.map((line, index) => {
              return (
                <MobileContent  key={index}>
                  <MobileDescription>{line.description}</MobileDescription>
                  <MobileInformation>{line.quantity.toFixed(2)} * £ {line.unitprice.toFixed(2)} -  £ {line.lineamount.toFixed(2)}</MobileInformation>
                </MobileContent>
               
              );
            })}
      </CartDiv>
  )
  }else{
    return (
      <CartDiv>
        <CartTable>
          <CartRow>
            <CartHeaderCell>Item</CartHeaderCell>
            <CartHeaderCell>Qty</CartHeaderCell>
            <CartHeaderCell style={{ textAlign: "right" }}>
              Unit Price
            </CartHeaderCell>
            <CartHeaderCell style={{ textAlign: "right" }}>
              Amount
            </CartHeaderCell>
          </CartRow>
          {props.cart.map((item, index) => {
            return (
              <CartRow key={index}>
                <CartRowCell>{item.description}</CartRowCell>
                <CartRowCell>{item.quantity.toFixed(2)}</CartRowCell>
                <CartRowCell style={{ textAlign: "right" }}>
                  £ {item.unitprice.toFixed(2)}
                </CartRowCell>
                <CartRowCell style={{ textAlign: "right" }}>
                  £ {item.lineamount.toFixed(2)}
                </CartRowCell>
              </CartRow>
            );
          })}
         <CartRow>
            <CartRowEmptyCell style={{ textAlign: "right" }}></CartRowEmptyCell>
            <CartRowEmptyCell style={{ textAlign: "right" }}></CartRowEmptyCell>
            <CartRowEmptyCell style={{ textAlign: "right" }}></CartRowEmptyCell>
            <CartRowCell style={{ textAlign: "right" }}>Total : £ {getTotalAmount()} </CartRowCell>
         </CartRow>
        </CartTable>
        <CartFooter>
          <CartButtons>
            <CartButton onClick={(_) => props.confirmOrderClick()}>Confirm Order</CartButton>
          </CartButtons>
        </CartFooter>
      </CartDiv>
  )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateCartItem: bindActionCreators(cartActions.updateCartItem, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartActionReducer,
    currentUser: state.currentUserReducer,
    settings: state.settingReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmOrderComponent);
