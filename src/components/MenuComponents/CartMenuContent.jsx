import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { colors } from "../../res/values/values";
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";

//#region Styles
const CartDiv = styled.div`
  margin: 1px;
  height: 100%;
  min-height: 50vh;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${colors.primaryColor};
  font-size: 0.8rem;
  font-weight: 500;
`;
const ScrollDiv = styled.div`
  min-height: 30vh;
  max-height: 40vh;
  overflow-y: scroll;
  white-space: nowrap;
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
  border-bottom: 1px solid lightgray;
`;
const CartHeaderCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${colors.primaryColor};
  text-align: left;
`;
const CartRowCell = styled.td`
  padding: 10px;
  text-align: left;
`;
const CartFooter = styled.div`
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CartTotal = styled.div``;
const CartButtons = styled.div`
  display: flex;
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
  color: ${colors.whiteColor};
  border-radius: 2px;
  margin: 2px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.darkcolor};
  }
`;
const CartRowButtonCell = styled.td`
  padding: 5px;
  border: 1px solid lightgray;
  text-align: left;
  border-width: 0px;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;
const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #6e6e6e;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
  word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`;
const MobileTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MobileDescription = styled.div`
  color: ${colors.primaryColor};
  margin-bottom: 0.5rem;
  margin-right:0.5rem ;
`;
const MobileInformation = styled.div`
  margin-left: 0.5rem;
`;
const MobileDelete = styled.div`
  margin-right:0.5rem ;
  & :hover{
    color:red;
  }
`;
//#endregion
function CartMenuContent(props) {
  const { width } = useWindowWidthAndHeight();
  const navigate = useNavigate();
  const getTotalAmount = () => {
    let totalAmount = 0;
    props.cart.map((item) => (totalAmount += item.lineamount));
    return totalAmount.toFixed(2);
  };
  if (width < 768) {
    return (
      <CartDiv>
        <ScrollDiv>
          {props.cart.map((line, index) => {
            return (
              <MobileContent key={index} >
                <MobileTop>
                  <MobileDescription>{line.description}</MobileDescription>
                  <MobileDelete onClick={()=>props.actions.removeFromCart(line.id)}><DeleteOutline></DeleteOutline></MobileDelete>
                </MobileTop>
                <MobileInformation>
                  @{line.itemunit} * £ {line.quantity.toFixed(2)} - £{" "}
                  {line.lineamount.toFixed(2)}
                </MobileInformation>
                
              </MobileContent>
            );
          })}
        </ScrollDiv>

        <CartFooter>
          <CartButtons>
            <CartButton onClick={(_) => navigate("/route=checkout/cart")}>
              View Cart
            </CartButton>
          </CartButtons>
          <CartTotal>Total : £ {getTotalAmount()}</CartTotal>
        </CartFooter>
      </CartDiv>
    );
  } else {
    return (
      <CartDiv>
        <ScrollDiv>
          <CartTable>
            <CartBody>
              <CartRow>
                <CartHeaderCell>Qty</CartHeaderCell>
                <CartHeaderCell>Item</CartHeaderCell>
                <CartHeaderCell style={{ textAlign: "right" }}>
                  Amount
                </CartHeaderCell>
                <CartHeaderCell></CartHeaderCell>
              </CartRow>
            </CartBody>
            <CartBody>
              {props.cart.map((item, index) => {
                return (
                  <CartRow key={index}>
                    <CartRowCell>{item.quantity}</CartRowCell>
                    <CartRowCell>{item.description}</CartRowCell>
                    <CartRowCell style={{ textAlign: "right" }}>
                      £ {item.lineamount.toFixed(2)}
                    </CartRowCell>
                    <CartRowButtonCell
                      onClick={() => {
                        props.actions.removeFromCart(item.id);
                      }}
                      style={{ textAlign: "center" }}
                    >
                      <DeleteOutline></DeleteOutline>
                    </CartRowButtonCell>
                  </CartRow>
                );
              })}
            </CartBody>
          </CartTable>
        </ScrollDiv>
        <CartFooter>
          <CartButtons>
            <CartButton onClick={(_) => navigate("/route=checkout/cart")}>
              View Cart
            </CartButton>
          </CartButtons>
          <CartTotal>Total : £ {getTotalAmount()}</CartTotal>
        </CartFooter>
      </CartDiv>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartActionReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContent);
