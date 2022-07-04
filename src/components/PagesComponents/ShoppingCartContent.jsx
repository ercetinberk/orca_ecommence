import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { colors } from "../../res/values/values";
import ShoppingCartContentLine from "./ShoppingCartContentLine";
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
//#region Styles
const CartDiv = styled.div`
  margin: 1px;
  height: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #6e6e6e;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px;
`;

const CartTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const ScrollDiv = styled.div`
  max-height: 45vh;
  overflow-y: scroll;
  white-space: nowrap;
  padding: 5px;
`;
const CartRow = styled.tr`
  height: 10px;
  letter-spacing: 1px;
  background-color: ${(props) => props.productStock < 0 && "#f2dede"};
`;
const CartHeaderCell = styled.td`
  padding: 10px;
  border: 1px solid lightgray;
  text-align: left;
`;
const CartFooter = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
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
  padding: 8px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.darkcolor};
  }
`;
const Error = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
const TotalPriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5px;
`;
const CartTotal = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  border: 1px solid lightgray;
  width: 100%;
  text-align: end;
`;
//#endregion
function ShoppingCartContent(props) {
  const navigate = useNavigate();
  const { width } = useWindowWidthAndHeight();
  const getTotalAmount = () => {
    let totalAmount = 0;
    props.cart.map((item) => (totalAmount += item.lineamount));
    return totalAmount.toFixed(2);
  };
  const getTotalIncVatAmount = () => {
    let totalAmountInclVat = 0;
    props.cart.map((item) => (totalAmountInclVat += item.lineamountinclvat));
    return totalAmountInclVat.toFixed(2);
  };
  const priceControl = () => {
    let rv = false;
    props.cart.map((item) => {
      if (item.unitprice === 0) rv = true;
    });
    return rv;
  };
  const stockControl = () => {
    return props.cart.filter((item) => {
      return item.stockqty <= 0;
    });
  };
  const onButtonClickHandler = (quantity, item) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      if (item.quantity === 1 && quantity === -1)
        props.actions.removeFromCart(item.id);
      else
        props.actions.updateCartItem({
          cartItem: item,
          quantity: item.quantity + quantity,
        });
    } else navigate("/route=account/login");
  };
  const checkout = () => {
    if (
      props.settings.orderlimit &&
      getTotalIncVatAmount() >= props.settings.orderlimitprice &&
      stockControl().length === 0 &&
      !priceControl()
    )
      navigate("/route=checkout/checkout");
    else
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };
  return props.cart.length > 0 ? (
    <CartDiv>
      {props.settings.orderlimit &&
        getTotalIncVatAmount() < props.settings.orderlimitprice && (
          <Error>
            Delivery orders can not be less than £{" "}
            {props.settings.orderlimitprice} !
          </Error>
        )}
      {priceControl() && <Error>There are products out of stock</Error>}
      {stockControl().length > 0 && (
        <Error>There are products out of stock !</Error>
      )}
      <ScrollDiv>
        <CartTable>
          {width >= 768 && (
            <CartRow>
              <CartHeaderCell>Image</CartHeaderCell>
              <CartHeaderCell>Item</CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "center" }} >Qty</CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
                Unit Price
              </CartHeaderCell>
              <CartHeaderCell style={{ textAlign: "right" }}>
                Amount
              </CartHeaderCell>
            </CartRow>
          )}

          {props.cart.map((item) => {
            return <ShoppingCartContentLine cartItem={item} />;
          })}
        </CartTable>
      </ScrollDiv>

      <TotalPriceRow>
        <CartTotal>Sub Total : £ {getTotalAmount()}</CartTotal>
      </TotalPriceRow>
      <TotalPriceRow>
        <CartTotal>
          Vat : £ {(getTotalIncVatAmount() - getTotalAmount()).toFixed(2)}
        </CartTotal>
      </TotalPriceRow>
      <TotalPriceRow>
        <CartTotal>Total : £ {getTotalIncVatAmount()}</CartTotal>
      </TotalPriceRow>
      <CartFooter>
        <CartButtons>
          <CartButton onClick={(_) => navigate("/")}>
            Continue Shopping
          </CartButton>
          <CartButton onClick={(_) => checkout()}>Checkout</CartButton>
        </CartButtons>
      </CartFooter>
    </CartDiv>
  ) : (
    <CartDiv></CartDiv>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
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
)(ShoppingCartContent);
