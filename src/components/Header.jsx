import { useEffect } from "react";
import { Badge } from "@material-ui/core";
import {
  AccountCircle,
  ShoppingCartRounded,
  Info,
  ShoppingBasketRounded,
  GetAppRounded
} from "@material-ui/icons";
import Autocomplete from "./AutoComplete";
import styled from "styled-components";
import DropDownMenu from "./MenuComponents/DropDownMenu";
import CartMenuContent from "./MenuComponents/CartMenuContent";
import AccountMenuContent from "./MenuComponents/AccountMenuContent";
import AboutMenuContent from "./MenuComponents/AboutMenuContent";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
import  useWindowWidthAndHeight  from "../utilities/hooks/useWindowWidthAndHeight";
//#region STYLES

const Container = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid lightgray;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;
//#region Left
const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const LogoContainer = styled.div`
  font-size: 60px;
  font-weight: 300;
  color: #333;
  align-items: center;
  justify-content: center;
`;
const LogoImage = styled.img`
  flex: 1;
  border-radius: 5px 5px 0 0;
  height: 4.5rem;
  width: 4.5rem;
  object-fit: contain;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;
//#endregion
//#region center
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  display: flex;
`;

//#endregion
//#region Right
const Right = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-right: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  margin-left: 10px;
  letter-spacing: 1px;
  cursor: pointer;
`;
//#endregion
//#endregion
function NavBar(props) {
  const navigate = useNavigate();
  const { width } = useWindowWidthAndHeight();
  useEffect(() => {
    props.actions.getCartList();
  }, [props.actions]);
  return (
    <Container>
      <Left>
        <LogoContainer
          onClick={(_) => {
            navigate("/");
          }}
        >
          <LogoImage src={`/catalog/Products/logo.png`}></LogoImage>
        </LogoContainer>
        {width <= 768 && (
          <ButtonSection>
            <AccountInfo
                onClick={() => {
                  navigate("/route=shop");
                }}
              >
                <GetAppRounded />
                MY APP
              </AccountInfo>
            {props.settings.intropage && (
              <AccountInfo
                onClick={() => {
                  navigate("/route=shop");
                }}
              >
                <ShoppingBasketRounded />
                SHOP
              </AccountInfo>
            )}
            {props.settings.registeruser && (
              <AccountInfo>
                <DropDownMenu
                  flexDirection="column"
                  icon={<AccountCircle />}
                  text={"ACCOUNT"}
                  contentWidth="10rem"
                  fontSize="0.8rem"
                  fontWeight="400"
                  right="3rem"
                  top="5rem"
                  minHeight="10vh"
                  contentLinks={<AccountMenuContent />}
                />
              </AccountInfo>
            )}
            {(width>768)&&
              <AccountInfo>
              <DropDownMenu
                flexDirection="column"
                icon={<Info />}
                text={"ABOUT"}
                contentWidth="10rem"
                fontSize="0.8rem"
                fontWeight="400"
                right="3rem"
                top="3.5rem"
                minHeight="10vh"
                contentLinks={<AboutMenuContent />}
              />
            </AccountInfo>
            }
            
            {props.cart.length > 0 && (
              <AccountInfo>
                <DropDownMenu
                  flexDirection="column"
                  icon={
                    <Badge
                      style={{ marginBottom: "0px" }}
                      badgeContent={props.cart !== null && props.cart.length}
                      color="secondary"
                    >
                      <ShoppingCartRounded />
                    </Badge>
                  }
                  text={"BASKET"}
                  contentWidth = {(width <= 648 )?"20rem" : "38rem" }
                  fontSize="0.8rem"
                  fontWeight="400"
                  right="1rem"
                  top="5rem"
                  minHeight="50vh"
                  contentLinks={<CartMenuContent />}
                />
              </AccountInfo>
            )}
          </ButtonSection>
        )}
      </Left>
      <Center>
        <SearchBar>
          <Autocomplete />
        </SearchBar>
      </Center>
      {width > 768 && (
        <Right>
          <ButtonSection>
            {props.settings.intropage && (
              <AccountInfo
                onClick={() => {
                  navigate("/route=shop");
                }}
              >
                <ShoppingBasketRounded />
                SHOP
              </AccountInfo>
            )}
            {props.settings.registeruser && (
              <AccountInfo>
                <DropDownMenu
                  flexDirection="column"
                  icon={<AccountCircle />}
                  text={"ACCOUNT"}
                  contentWidth="10rem"
                  fontSize="0.8rem"
                  fontWeight="400"
                  right="5.5rem"
                  top="5rem"
                  minHeight="5vh"
                  contentLinks={<AccountMenuContent />}
                />
              </AccountInfo>
            )}
            <AccountInfo>
              <DropDownMenu
                flexDirection="column"
                icon={<Info />}
                text={"ABOUT"}
                contentWidth="10rem"
                fontSize="0.8rem"
                fontWeight="400"
                right="2rem"
                top="5rem"
                minHeight="10vh"
                contentLinks={<AboutMenuContent />}
              />
            </AccountInfo>
            {props.cart.length > 0 && (
              <AccountInfo>
                <DropDownMenu
                  flexDirection="column"
                  icon={
                    <Badge
                      style={{ marginBottom: "0px" }}
                      badgeContent={props.cart !== null && props.cart.length}
                      color="secondary"
                    >
                      <ShoppingCartRounded />
                    </Badge>
                  }
                  text={"BASKET"}
                  contentWidth="40rem"
                  fontSize="0.8rem"
                  fontWeight="400"
                  right="1rem"
                  top="5rem"
                  minHeight="50vh"
                  contentLinks={<CartMenuContent />}
                />
              </AccountInfo>
            )}
          </ButtonSection>
        </Right>
      )}
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCartList: bindActionCreators(cartActions.getCartList, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartActionReducer,
    settings: state.settingReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
