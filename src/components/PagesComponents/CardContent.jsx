import { Button, ButtonGroup } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { colors } from "../../res/values/values";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import CartAccordionMenu from "../MenuComponents/CartAccordionMenu";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import OrcaModal from "../Modal/OrcaModal";
//#region styles

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.2s ease;
`;
const DDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Row = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  margin-top: 10px;
  @media only screen and (min-width: 767px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  height: 18rem;
  object-fit: contain;
  padding: 1vw;
  border-width: 1px;
  border-color: lightgray;
  border-style: solid;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const Details = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1vw;
  width: 100%;
  @media only screen and (min-width: 768px) {
    text-align: start;
    align-items: flex-start;
  }
`;

const Title = styled.span`
  font-size: 1.4rem;
  color: ${colors.primaryColor};
  font-weight: 600;
  padding: 5px;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;
const Text = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 2px;
  padding-right: 10px;
  border-width: 0px 0px 0px 0px;
  border-color: lightgray;
  border-style: solid;
  @media only screen and (min-width: 768px) {
    font-size: 0.8rem;
    margin-left: 10px;
  }
`;
const BreadCrumbText = styled.a`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${colors.primaryColor};
  padding: 5px;
  border-width: 0px 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  @media only screen and (min-width: 768px) {
    border-width: 0px 1px 0px 0px;
    padding: 2px;
    margin-left: 10px;
    padding-right: 10px;
  }
`;

const Price = styled.h4`
  margin-top: 10px;
  color: ${colors.primaryColor};
  padding: 5px;
  font-size: 1.3rem;
  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
    margin-left: 10px;
    text-align: left;
  }
`;

const CartActions = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  padding: 10px;
  height: 2.5rem;
`;

const QtyInput = styled.input`
  border: 1px solid lightgray;
  font-weight: 600;
  border-radius: 2px;
  margin-right: 5px;
  font-size: 0.9rem;
  width: 100%;
  color: ${colors.primaryColor};
  text-align: center;
  @media only screen and (min-width: 768px) {
    padding-left: 5px;
    margin-left: 1vw;
    font-size: 1.1rem;
  }
`;

const CartInfo = styled.div`
  text-align: center;
  align-items: center;
  background-color: ${(props) =>
    props.qtyValue === 0 ? "transparent" : colors.lightcolor};
  color: white;
  font-size: 14px;
  font-weight: 200;
  margin-bottom: 10px;
`;
const DeliveryMethodDiv = styled.div`
  align-items: center;
  width: 20rem;
  & div:hover {
    background-color: ${colors.primaryColor};
  }
`;
const WaitDiv = styled.div`
  align-items: center;
  justify-content: center;
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

function CardContent(props) {
  //#region VARIABLES
  const [qtyValue, setqtyValue] = useState(0);
  const [accordionData, setAccordionData] = useState([]);
  const [productCategory, setProductCategory] = useState({});
  const [productSubCategory, setProductSubCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [disableValue, setDisabled] = useState(false);
  const inputRef = useRef(null);

  const [delMethodQty, setDelMethodQty] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    disableValue && setDisabled(false);
  };
  let addProductMethod = "";
  //#endregion

  useEffect(() => {
    if (props.categories.length > 0) {
      let cartItem = props.cart.find((c) => c.itemno === props.product.itemno);
      props.cart.length > 0
        ? setDeliveryMethod(props.cart[0].deliverymethod)
        : setDeliveryMethod("");
      if (cartItem) setqtyValue(cartItem.quantity);
      else setqtyValue(0);
      let l_accordionData = [];
      l_accordionData.push({
        parentid: 0,
        title: "Other Informations",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non magna leo. Etiam nec nibh accumsan, pellentesque nibh efficitur, dapibus erat.",
          "Suspendisse dignissim laoreet pretium. Ut at viverra nunc, ac varius elit. Sed et ornare metus.",
          "Phasellus convallis purus maximus blandit elementum. In dictum auctor enim, non dapibus erat ultricies.",
        ],
      });
      setAccordionData(l_accordionData);
      if (props.product.itemcategory !== "") {
        let cat = props.categories.find(
          (x) => x.code === props.product.itemcategory
        );
        setProductCategory(cat);
      }
      if (props.product.productgroup !== "") {
        let subCat = props.categories.find(
          (x) => x.code === props.product.productgroup
        );
        setProductSubCategory(subCat);
      }
      setLoading(false);
    }
  }, [props]);
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
  const onChangeHandler = async (event) => {
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
                inputRef.current.focus();
              } else {
                setDisabled(true);
                await props.actions.updateCartItem({
                  cartItem: cartItem,
                  quantity: parseInt(newQty),
                });
                setDisabled(false);
                inputRef.current.focus();
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
                inputRef.current.focus();
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
  const changeDeliveryMethod = (method) => {
    addProductMethod === "onClick"
      ? addProductForButtonClick(delMethodQty, method)
      : addProductForOnChangeHandler(delMethodQty, method);
    handleClose();
  };
  return (
    <Container>
      {!loading ? (
        <Container>
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
              <CircularProgress size={40} thickness={4} />
              <p>Please Wait ...</p>
            </WaitDiv>
          </OrcaModal>
          <Row>
            <BreadCrumbText
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </BreadCrumbText>
            {productCategory.code && (
              <BreadCrumbText
                onClick={() => {
                  navigate("/route=search?categoryid=" + productCategory.code);
                }}
              >
                {productCategory.description}
              </BreadCrumbText>
            )}
            {productSubCategory.code && (
              <BreadCrumbText
                onClick={() => {
                  navigate(
                    `/route=search?categoryid=${productCategory.code}&productid=${productSubCategory.code}`
                  );
                }}
              >
                {" "}
                {productSubCategory.description}{" "}
              </BreadCrumbText>
            )}
            <BreadCrumbText style={{ color: "black" }}>
              {props.product.description}
            </BreadCrumbText>
          </Row>
          <Row>
            <Image src={`/${props.product.image}`} alt="cart_image" />
            <DDiv>
              <Details>
                <Title>{props.product.description}</Title>
                <Text>Product No : {props.product.itemno}</Text>
                <Text>Unit : {props.product.salesunit}</Text>
                <Text>Pack Size : {props.product.packsize}</Text>
                <Text>Unit Size : {props.product.unitsize}</Text>
                <Text>Vat %: {props.product.vat}</Text>
                <Text>Stock : {props.product.stockqty}</Text>
                {props.settings.pricevisible && (
                  <Price>£ {props.product.unitprice}</Price>
                )}
              </Details>
              <CartActions>
                <QtyInput
                  name="qtyinput"
                  onChange={onChangeHandler}
                  type="number"
                  value={qtyValue}
                  disabled={disableValue}
                  ref={inputRef}
                />
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    onClick={() => {
                      onButtonClickHandler(-1);
                    }}
                  >
                    <Remove
                      style={{
                        color: colors.primaryColor,
                        flex: "1",
                        height: "100%",
                      }}
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      onButtonClickHandler(1);
                    }}
                  >
                    <Add
                      style={{
                        color: colors.primaryColor,
                        flex: "1",
                        height: "100%",
                      }}
                    />
                  </Button>
                </ButtonGroup>
              </CartActions>
            </DDiv>
          </Row>
          <CartInfo qtyValue={qtyValue}>{qtyValue} products in cart</CartInfo>
          {accordionData.map((item) => {
            return <CartAccordionMenu key={item.title} item={item} />;
          })}
        </Container>
      ) : (
        <Container></Container>
      )}
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addCartApi: bindActionCreators(cartActions.addCart, dispatch),
      updateCartItem: bindActionCreators(cartActions.updateCartItem, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartActionReducer,
    categories: state.categoryListReducer,
    settings: state.settingReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CardContent);
