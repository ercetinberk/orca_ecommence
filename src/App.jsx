import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import Search from "./pages/Search";
import Intro from "./pages/Intro";
import NoPage from "./pages/NoPage";
import { Routes, Route } from "react-router-dom";
import Card from "./pages/Card";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import About from "./pages/About"
import Contact from "./pages/Contact"
import Charge from "./pages/Charge"
//#region REDUX
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "./redux/actions/userActions";
import * as settingsActions from "./redux/actions/settingsActions";
import  useWindowWidthAndHeight  from "./utilities/hooks/useWindowWidthAndHeight";
//#endregion
const App = (props) => {
  const [loading, setLoading] = useState(true);
  const { width } = useWindowWidthAndHeight();
  useEffect((_) => {
    const renderPage = async () => {
      await props.actions.getSettings();
      const access_token = localStorage.getItem("access_token");
      if (access_token) await props.actions.getUser();
      setLoading(false);
    };
    renderPage();
   // const platform = window.navigator.platform.match(/^Mac/)
    const platform = window.navigator.platform

    alert(platform);
    if(width<=768)
      alert("download mobile app please")
  }, [props.actions,width]);
  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <div>
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
    settings: state.settingReducer
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
