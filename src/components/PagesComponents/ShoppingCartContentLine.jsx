// SHOPPING CART LINES

import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { colors } from "../../res/values/values";
import CircularProgress from "@mui/material/CircularProgress";
import OrcaModal from "../Modal/OrcaModal";
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
//#region Styles

const CartRow = styled.tr`
  height: 10px;
  letter-spacing: 1px;
  background-color: ${(props) => props.productStock < 0 && "#f2dede"};
  border: 1px solid lightgray;
`;

const CartRowCell = styled.td`
  padding: 10px;
  text-align: left;
  min-width: 30%;
  @media only screen and (min-width: 768px) {
    border: 1px solid lightgray;
  }
  & p {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`;
const Divv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media only screen and (min-width: 768px) {
    justify-content:center ;
  }
  
`;
const CartRowButtonCell = styled.td`
  padding: 5px;
  border: 1px solid lightgray;
  text-align: left;
  &:hover {
    background-color: #fca0a0;
    cursor: pointer;
  }
`;

const QtyInput = styled.input`
  border: 1px solid lightgray;
  width: 20%;
  color: ${colors.primaryColor};
  border-radius: 1px;
  padding: 5px;
  font-size: 1rem;
  text-align: center;
  @media only screen and (min-width: 768px) {
    width: 15%;
  }
`;
const QtyButtons = styled.button`
  width: 30%;
  border: 1px solid lightgray;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #e7e7e7;
    cursor: pointer;
  }
  @media only screen and (min-width: 768px) {
    width: 20%;
  }
`;

const Image = styled.img`
  flex: 1;
  border-radius: 5px 5px 0 0;
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  padding: 5px;
`;
const WaitDiv = styled.div`
  display:flex ;
  flex:1;
  flex-direction:column ;
  align-items: center;
  justify-content: center;
  & p {
    margin-top:0.8rem ;
  }
  & h3 {
    margin-top:0.8rem ;
    color:${colors.primaryColor};
  }
`;
//#endregion
function ShoppingCartContentLine(props) {
  const [qtyValue, setqtyValue] = useState(0);
  const [disableValue, setDisabled] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { width } = useWindowWidthAndHeight();
  useEffect(() => {
    setqtyValue(props.cartItem.quantity);
    //return () => { // ComponentWillUnmount in Class Component
    //  inputRef.current = false;
    //}
  }, [props.cartItem]);
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
  const onChangeHandler = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "qtyinput":
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          if (value !== "") {
            setDisabled(true);
            let newQty = parseInt(value);
            if (newQty === 0 || newQty < 0) {
              await props.actions.removeFromCart(props.cartItem.id);
              setDisabled(false);
              inputRef.current && inputRef.current.focus();
            } else {
              await props.actions.updateCartItem({
                cartItem: props.cartItem,
                quantity: parseInt(newQty),
              });
              setDisabled(false);
              inputRef.current && inputRef.current.focus();
            }
          } else {
            setqtyValue("");
          }
        } else navigate("/route=account/login");

        break;
      default:
      // code block
    }
  };
  if(width < 768 ){
    return(
      <CartRow key={props.cartItem.id} productStock={props.cartItem.stockqty}>
          <OrcaModal isOpen={disableValue} onClose={() => setDisabled(false)}>
            <WaitDiv>
              <CircularProgress size={40} thickness={5} />
              <h3>PROCESS CONTINUING</h3>
              <p>Please wait ...</p>
            </WaitDiv>
          </OrcaModal>
          <CartRowCell style={{ textAlign: "center" }}>
            <Image src={`/${props.cartItem.image}`} />
          </CartRowCell>
          <div>
            <CartRowCell>
              <p>{props.cartItem.description}</p>
            </CartRowCell>
            <div>
              <CartRowCell>
                <Divv>
                  <QtyButtons
                    onClick={() => {
                      onButtonClickHandler(-1, props.cartItem);
                    }}
                  >
                    -
                  </QtyButtons>
                  
                  <QtyInput
                    name="qtyinput"
                    onChange={onChangeHandler}
                    type="number"
                    value={qtyValue}
                    disabled={disableValue}
                    ref={inputRef}
                  />
                  <QtyButtons
                    onClick={() => {
                      onButtonClickHandler(1, props.cartItem);
                    }}
                  >
                    +
                  </QtyButtons>
                </Divv>
              </CartRowCell>
              <CartRowCell style={{ textAlign: "right" }}>
                £ {props.cartItem.lineamount.toFixed(2)}
              </CartRowCell>
            </div>
          </div>

          <CartRowButtonCell
            onClick={() => {
              props.actions.removeFromCart(props.cartItem.id);
            }}
            style={{ textAlign: "center" }}
          >
            <DeleteOutline></DeleteOutline>
          </CartRowButtonCell>
      </CartRow>
    )
  }else{
    return(
      <CartRow key={props.cartItem.id} productStock={props.cartItem.stockqty}>
          <OrcaModal isOpen={disableValue} onClose={() => setDisabled(false)}>
            <WaitDiv>
              <CircularProgress size={40} thickness={5} />
              <h3>PROCESS CONTINUING</h3>
              <p>Please wait ...</p>
            </WaitDiv>
          </OrcaModal>
          <CartRowCell style={{ textAlign: "center" }}>
            <Image src={`/${props.cartItem.image}`} />
          </CartRowCell>
          <CartRowCell>
            <p>{props.cartItem.description}</p>
            
          </CartRowCell>

          <CartRowCell style={{ textAlign: "center",alignItems:"center" }}>
            
            <Divv>
              <QtyButtons
                onClick={() => {
                  onButtonClickHandler(-1, props.cartItem);
                }}
              >
                -
              </QtyButtons>
              <QtyInput
                    name="qtyinput"
                    onChange={onChangeHandler}
                    type="number"
                    value={qtyValue}
                    disabled={disableValue}
                    ref={inputRef}
                  />
              <QtyButtons
                onClick={() => {
                  onButtonClickHandler(1, props.cartItem);
                }}
              >
                +
              </QtyButtons>
            </Divv>
          </CartRowCell>
          <CartRowCell style={{ textAlign: "right" }}>
            £ {props.cartItem.lineamount.toFixed(2)}
          </CartRowCell>
          <CartRowCell style={{ textAlign: "right" }}>
            £ {props.cartItem.unitprice.toFixed(2)}
          </CartRowCell>
          <CartRowButtonCell
            onClick={() => {
              props.actions.removeFromCart(props.cartItem.id);
            }}
            style={{ textAlign: "center" }}
          >
            <DeleteOutline></DeleteOutline>
          </CartRowButtonCell>
      </CartRow>
    )
  }
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
)(ShoppingCartContentLine);
