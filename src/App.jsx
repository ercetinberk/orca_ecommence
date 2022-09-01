import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import Search from "./pages/Search";
import Intro from "./pages/Intro";
import NoPage from "./pages/NoPage";
import { Routes, Route } from "react-router-dom";
import Card from "./pages/Card";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Charge from "./pages/Charge";
//#region REDUX
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "./redux/actions/userActions";
import * as settingsActions from "./redux/actions/settingsActions";
import useWindowWidthAndHeight from "./utilities/hooks/useWindowWidthAndHeight";
import OrcaBottomModal from "./components/Modal/OrcaBottomModal";
import styled from "styled-components";
import {colors} from "./res/values/values"



const LogoContainer = styled.div`
  display:flex ;
  flex:1;
  flex-direction:column ;
  align-items: center;
  justify-content: center;
  padding:2rem ;
`;
const LogoImage = styled.img`
  height: 5rem;
  width: 5rem;
  object-fit: contain;
`;
const Button = styled.div`
  border: none;
  padding: 15px;
  background-color: ${colors.primaryColor};
  color: white;
  margin-top: 10px;
  cursor: pointer;
  & a {
    color:white ;
    text-decoration-line:none;
  }
`;
//#endregion
const App = (props) => {
  const [loading, setLoading] = useState(true);
  const { width } = useWindowWidthAndHeight();

  const applePlatform = window.navigator.platform.match(/Mac|iP(ad|hone)/);
  const androidPlatform = window.navigator.platform.match(
    /Mobile|mini|Fennec|Android|Linux/
  );
  const [disableValue, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    disableValue && setDisabled(false);
  };
  useEffect(
    (_) => {
      const renderPage = async () => {
        await props.actions.getSettings();
        const access_token = localStorage.getItem("access_token");
        if (access_token) await props.actions.getUser();
        setLoading(false);
      };
      renderPage();

      if (width <= 768) {
        handleOpen();
      }
    },
    [props.actions, width]
  );
  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <div>
          <OrcaBottomModal isOpen={open} onClose={handleClose}>
            <LogoContainer>
              <LogoImage src={`/catalog/Products/logo.png`}></LogoImage>
              {applePlatform ? (
                <Button><a href="https://apps.apple.com/tr/app/expo-foods-application/id1582599794">Download My App</a></Button>
              ) : (
                androidPlatform && <Button>
                  <a href="https://play.google.com/store/apps/details?id=com.expofoodssalesapp">Download My App</a>
                </Button>
              )}
            </LogoContainer>
          </OrcaBottomModal>
          <Routes>
            {props.settings.intropage ? (
              <Route path="/" element={<Intro />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}
            <Route path="/route=shop/" element={<Home />} />
            <Route path="*" element={<NoPage />} />

            <Route path="/route=account/" element={<MyAccount />}>
              <Route path=":page" element={<MyAccount />} />
            </Route>
            <Route path="/route=search" element={<Search />} />
            <Route path="/route=product/card" element={<Card />}>
              <Route path=":productid" element={<Card />} />
            </Route>
            <Route path="/route=checkout/cart" element={<ShoppingCart />} />
            <Route path="/route=checkout/checkout" element={<Checkout />} />
            <Route path="/route=about" element={<About />} />
            <Route path="/route=contact" element={<Contact />} />
            <Route path="/route=charge" element={<Charge />} />
          </Routes>
        </div>
      )}
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(userActions.getUser, dispatch),
      getSettings: bindActionCreators(settingsActions.getSettings, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    settings: state.settingReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
