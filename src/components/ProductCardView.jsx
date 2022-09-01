import { Button, ButtonGroup } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { colors } from "../res/values/values";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
import * as userActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import OrcaModal from "./Modal/OrcaModal";

//#region Card styles
const Container = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 1px;
  max-width: 16rem;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    border: 1px solid ${colors.primaryColor};
  }
`;
const Image = styled.img`
  height: 10rem;
  width: 10rem;
  margin-top: 0.5rem;
  min-height: 10rem;
  object-fit: contain;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  height: 2.5rem;
  min-height: 2.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  margin: 0.5rem;
  color: black;
`;
const CardProductInfo = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  margin-bottom: 0.2rem;
  margin-left: 0.5rem;
  color: black;
`;
const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
const StockDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 1px;
`;
const Stock = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 5px;
  color: ${(props) => (props.stockqty > 0 ? "darkgreen" : "darkred")};
`;
const Price = styled.span`
  text-align: left;
  padding: 5px;
  font-size: 0.9em;
  font-weight: 700;
  color: ${colors.primaryColor};
`;
const CartActions = styled.div`
  display: flex;
  padding: 5px;
  height: 2.5rem;
`;
const QtyInput = styled.input`
  border: 1px solid lightgray;
  width: 50%;
  color: black;
  border-radius: 1px;
  margin-right: 5px;
  padding-left: 5px;
  font-size: 1.1rem;
  text-align: center;
`;

//#endregion
//#region Ortak View
const ProductInfo = styled.div`
  font-weight: 500;
  font-size: 0.7rem;
  position: absolute;
  margin: 0.1rem;
  top: 0;
  left: 0;
  z-index: 4;
  text-align: center;
  box-shadow: ${(props) => props.type && "2px 2px rgba(0, 0, 0, 0.3)"};
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.type === "" ? "transparent" : "#fff")};
  background-color: ${(props) =>
    props.type === ""
      ? "transparent"
      : props.type === "sale"
      ? colors.salecolor
      : colors.weboffercolor};
`;
const QuantityInfo = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0.1rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  text-align: center;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  overflow: hidden;
  color: white;
  background-color: ${colors.primaryColor};
`;
const DeliveryMethodDiv = styled.div`
  align-items: center;
  width: 20rem;
  & div:hover {
    background-color: ${colors.primaryColor};
  }
`;
const WaitDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & p {
    margin-top: 0.8rem;
  }
  & h3 {
    margin-top: 0.8rem;
    color: ${colors.primaryColor};
  }
`;
const DeliveryMethodButton = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  align-items: center;
  text-align: center;
  color: ${colors.whiteColor};
  margin: 1rem;
  padding: 5px;
  margin-top: 5px;
  background-color: ${colors.lightcolor};
`;
//#endregion
//#region List Styles
const ContainerListView = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 1px;
  margin-top: 0.9rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${colors.primaryColor};
  }
`;
const ContentListView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.2s ease;
  padding: 0.5rem;
  @media only screen and (min-width: 920px) {
    flex-direction: row;
    align-items: center;
  }
`;
const ImageListView = styled.img`
  height: 7rem;
  width: 7rem;
  min-width: 7rem;
  object-fit: contain;
`;
const DetailsListView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const LeftContentListView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  @media only screen and (min-width: 920px) {
    width: 70%;
  }
`;
const TitleListView = styled.span`
  font-size: 1rem;
  font-weight: 500;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 0.5rem;
  color: ${colors.primaryColor};
`;
const ProductInformationListView = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  padding-left: 5px;
  padding-right: 5px;
`;
const InfoView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 1.4rem;
  min-height: 1.4rem;
`;
const InfoTextListView = styled.div`
  font-size: 0.6rem;
  font-weight: 400;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
`;
const PriceDivListView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const PriceListView = styled.h4`
  text-align: left;
  padding: 5px;
  font-size: 1em;
  font-weight: 600;
  color: ${colors.primaryColor};
`;
const OldPriceListView = styled.h4`
  text-align: left;
  padding: 5px;
  font-size: 0.9em;
  font-weight: 500;
  color: #636363;
  text-decoration: line-through 2px #979797;
`;
const CartActionsListView = styled.div`
  display: flex;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const QtyInputListView = styled.input`
  border: 1px solid lightgray;
  color: ${colors.primaryColor};
  padding-left: 5px;
  min-height: 2rem;
  width: 45%;
  font-size: 1.1rem;
  text-align: center;
  @media only screen and (min-width: 920px) {
    width: 5vh;
  }
`;
//#endregion
function ProductCardView(props) {
  const [qtyValue, setqtyValue] = useState(0);

  const [disableValue, setDisabled] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    disableValue && setDisabled(false);
  };
  const [delMethodQty, setDelMethodQty] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");

  let addProductMethod = "";
  useEffect(() => {
    let cartItem = props.cart.find((c) => c.itemno === props.product.itemno);
    props.cart.length > 0
      ? setDeliveryMethod(props.cart[0].deliverymethod)
      : setDeliveryMethod("");
    if (cartItem) setqtyValue(cartItem.quantity);
    else setqtyValue(0);
  }, [props.cart, props.product.itemno]);

  const onButtonClickHandler = (quantity) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      addProductMethod = "onClick";
      if (deliveryMethod === "") {
        setDelMethodQty(quantity);
        handleOpen();
      } else {
        addProductForButtonClick(quantity, deliveryMethod);
      }
    } else navigate("/route=account/login");
  };
  const addProductForButtonClick = (quantity, method) => {
    if (quantity === -1) {
      if (qtyValue > 1) {
        props.actions.addCartApi({
          product: props.product,
          quantity: -1,
          deliveryMethod: method,
        });
      } else if (qtyValue === 1) {
        props.actions.addCartApi({
          product: props.product,
          quantity: 0,
          deliveryMethod: method,
        });
      }
    } else {
      props.actions.addCartApi({
        product: props.product,
        quantity: 1,
        deliveryMethod: method,
      });
    }
  };
  const addProductForOnChangeHandler = async (quantity, deliveryMethod) => {
    setDisabled(true);
    await props.actions.addCartApi({
      product: props.product,
      quantity,
      deliveryMethod,
    });
    setDisabled(false);
    inputRef.current.focus();
  };
  const onChangeHandler = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "qtyinput":
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          addProductMethod = "onChangeHandler";
          if (value !== "") {
            setqtyValue(value);
          } else {
            setqtyValue("");
          }
        } else navigate("/route=account/login");

        break;
      default:
      // code block
    }
  };
  const onBlurHandler = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "qtyinput":
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          addProductMethod = "onChangeHandler";
          if (value !== "") {
            let newQty = parseInt(value);
            let cartItem = props.cart.find(
              (c) => c.itemno === props.product.itemno
            );
            if (cartItem) {
              if (newQty === 0 || newQty < 0) {
                setDisabled(true);
                await props.actions.removeFromCart(cartItem.id);
                setDisabled(false);
                //inputRef.current.focus()
              } else {
                setDisabled(true);
                await props.actions.updateCartItem({
                  cartItem: cartItem,
                  quantity: parseInt(newQty),
                });
                setDisabled(false);
                //inputRef.current.focus()
              }
            } else {
              if (newQty > 0) {
                if (deliveryMethod === "") {
                  setDelMethodQty(parseInt(newQty));
                  handleOpen();
                } else {
                  addProductForOnChangeHandler(
                    parseInt(newQty),
                    deliveryMethod
                  );
                }
              } else {
                setqtyValue(0);
                setDisabled(false);
                //inputRef.current.focus()
              }
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
  const changeDeliveryMethod = (method) => {
    addProductMethod === "onClick"
      ? addProductForButtonClick(delMethodQty, method)
      : addProductForOnChangeHandler(delMethodQty, method);
    handleClose();
  };

  if (props.viewType === "Grid") {
    return (
      <Container qtyValue={qtyValue}>
        <OrcaModal isOpen={open} onClose={handleClose}>
          <DeliveryMethodDiv>
            <DeliveryMethodButton
              onClick={() => changeDeliveryMethod("Delivery")}
            >
              Delivery{" "}
            </DeliveryMethodButton>
            <DeliveryMethodButton
              onClick={() => changeDeliveryMethod("Collection")}
            >
              Collection{" "}
            </DeliveryMethodButton>
          </DeliveryMethodDiv>
        </OrcaModal>
        <OrcaModal isOpen={disableValue} onClose={() => setDisabled(false)}>
          <WaitDiv>
            <CircularProgress size={40} thickness={5} />
            <h3>PROCESS CONTINUING</h3>
            <p>Please wait ...</p>
          </WaitDiv>
        </OrcaModal>
        {qtyValue > 0 && <QuantityInfo>{qtyValue}</QuantityInfo>}

        <ProductInfo
          type={
            props.product.itemprice - props.product.unitprice
              ? "sale"
              : props.product.weboffer > 0
              ? "weboffer"
              : ""
          }
        >
          {props.product.itemprice - props.product.unitprice
            ? "SALE"
            : props.product.weboffer > 0
            ? "OFFER"
            : ""}
        </ProductInfo>
        <Image
          onClick={() => {
            navigate(`/route=product/card/${props.product.itemno}`);
          }}
          src={`./${props.product.image}`}
        />
        <Details>
          <Title>{props.product.description} </Title>
          <CardProductInfo>
            {props.product.unitsize !== "" && props.product.packsize}*
            {props.product.packsize !== "" && props.product.unitsize}
          </CardProductInfo>
          <CardProductInfo>
            Unit : {props.product.salesunit !== "" && props.product.salesunit}
            {props.product.vat > 0 && " "} {props.product.vat > 0 && "•"}{" "}
            {props.product.vat > 0 && " "}
            {props.product.vat > 0 && "Vat: %"}
            {props.product.vat > 0 && props.product.vat}
          </CardProductInfo>
          <PriceDiv>
            <Price>Col : £{props.product.unitprice}</Price>
            <Price>Del : £{props.product.itemprice}</Price>
          </PriceDiv>
          <CartActions>
            <QtyInput
              name="qtyinput"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              type="number"
              value={qtyValue}
              disabled={disableValue}
              ref={inputRef}
            />
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                style={{ borderRadius: "1px" }}
                onClick={() => {
                  onButtonClickHandler(-1);
                }}
              >
                <Remove
                  style={{
                    color: "black",
                    flex: "1",
                    height: "100%",
                  }}
                />
              </Button>
              <Button
                style={{ borderRadius: "1px" }}
                onClick={() => {
                  onButtonClickHandler(1);
                }}
              >
                <Add
                  style={{
                    color: "black",
                    flex: "1",
                    height: "100%",
                  }}
                />
              </Button>
            </ButtonGroup>
          </CartActions>
          <StockDiv>
            {props.product.stockqty > 0 ? (
              <Stock stockqty={props.product.stockqty}>In Stock</Stock>
            ) : (
              <Stock stockqty={props.product.stockqty}>Out Of Stock</Stock>
            )}
          </StockDiv>
        </Details>
      </Container>
    );
  } else {
    return (
      <ContainerListView qtyValue={qtyValue}>
        <OrcaModal isOpen={open} onClose={handleClose}>
          <DeliveryMethodDiv>
            <DeliveryMethodButton
              onClick={() => changeDeliveryMethod("Delivery")}
            >
              Delivery{" "}
            </DeliveryMethodButton>
            <DeliveryMethodButton
              onClick={() => changeDeliveryMethod("Collection")}
            >
              Collection{" "}
            </DeliveryMethodButton>
          </DeliveryMethodDiv>
        </OrcaModal>
        <OrcaModal isOpen={disableValue} onClose={() => setDisabled(false)}>
          <WaitDiv>
            <CircularProgress size={40} thickness={5} />
            <h3>PROCESS CONTINUING</h3>
            <p>Please wait ...</p>
          </WaitDiv>
        </OrcaModal>
        <ProductInfo
          type={
            props.product.itemprice - props.product.unitprice
              ? "sale"
              : props.product.weboffer > 0
              ? "weboffer"
              : ""
          }
        >
          {props.product.itemprice - props.product.unitprice
            ? "SALE"
            : props.product.weboffer > 0
            ? "WEB OFFER"
            : ""}
        </ProductInfo>
        <ContentListView>
          <LeftContentListView>
            <ImageListView
              onClick={() => {
                navigate(`/route=product/card/${props.product.itemno}`);
              }}
              src={`./${props.product.image}`}
            />

            <DetailsListView>
              <TitleListView>{props.product.description}</TitleListView>
              <ProductInformationListView>
                Size : {props.product.unitsize !== "" && props.product.packsize}
                *{props.product.packsize !== "" && props.product.unitsize} •{" "}
                Unit :{" "}
                {props.product.salesunit !== "" && props.product.salesunit} •{" "}
                Vat % :{props.product.vat > 0 && props.product.vat} • Stock Qty
                : {props.product.stockqty > 0 && props.product.stockqty}
              </ProductInformationListView>
              {props.product.stockqty > 0 ? (
                <InfoView border={true}>
                  <InfoTextListView
                    style={{
                      color: "darkgreen",
                      textAlign: "right",
                      fontWeight: "500",
                    }}
                  >
                    In Stock
                  </InfoTextListView>
                </InfoView>
              ) : (
                <InfoView border={true}>
                  <InfoTextListView
                    style={{
                      color: "darkred",
                      textAlign: "right",
                      fontWeight: "500",
                    }}
                  >
                    Out Of Stock
                  </InfoTextListView>
                </InfoView>
              )}
              {props.settings.pricevisible && (
                <PriceDivListView>
                  <PriceListView>£ {props.product.unitprice}</PriceListView>
                  {props.product.itemprice - props.product.unitprice > 0 && (
                    <OldPriceListView>
                      £ {props.product.itemprice}
                    </OldPriceListView>
                  )}
                </PriceDivListView>
              )}
            </DetailsListView>
          </LeftContentListView>
          <CartActionsListView>
            <Button
              style={{ border: "1px solid lightgray", borderRadius: "0" }}
              onClick={() => {
                onButtonClickHandler(-1);
              }}
            >
              <Remove style={{ color: colors.primaryColor }} />
            </Button>

            <QtyInputListView
              name="qtyinput"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              type="number"
              value={qtyValue}
              disabled={disableValue}
              ref={inputRef}
            />

            <Button
              style={{ border: "1px solid lightgray", borderRadius: "0" }}
              onClick={() => {
                onButtonClickHandler(1);
              }}
            >
              <Add style={{ color: colors.primaryColor }} />
            </Button>
          </CartActionsListView>
        </ContentListView>
        {qtyValue > 0 && <QuantityInfo>{qtyValue}</QuantityInfo>}
      </ContainerListView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addCartApi: bindActionCreators(cartActions.addCart, dispatch),
      updateCartItem: bindActionCreators(cartActions.updateCartItem, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      changeDeliveryMethod: bindActionCreators(
        userActions.changeDeliveryMethod,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartActionReducer,
    settings: state.settingReducer,
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCardView);
