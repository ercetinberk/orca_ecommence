import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import styled from "styled-components";

import { colors } from "../../res/values/values";
import * as settingsActions from "../../redux/actions/settingsActions";
const Container = styled.div`
    height:100% ;
`;
const Content = styled.div`
  margin-top: 5px;
  padding: 5px;
  border-right: 0px solid lightgray;
  border-bottom: 1px solid lightgray;
  @media only screen and (min-width: 600px) {
    border-right: 1px solid lightgray;
    border-bottom: 0px solid lightgray;
  }
`;
const ContentDiv = styled.div`
  margin: 20px;
  & h2 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #444;
  }
`;
const List = styled.ul`
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 0;
  list-style: none;
  & li {
    display: list-item;
    text-align: -webkit-match-parent;
    margin-bottom: 5px;
    cursor: pointer;
    & a {
      color: ${colors.primaryColor};
    }
  }
`;
function AccountMenu(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("access_token");
  useEffect((_) => {
    props.actions.getSettings();

    if (access_token) props.actions.getUser();

    setLoading(false);
  }, []);
  const logoutClick = async () => {
    await props.actions.logoutUser()
    navigate("/route=account/logout");
  };
  return (
    <Container>
      <Content>
        {access_token ? (
          <ContentDiv>
            <h2>My Account</h2>
            <List>
              <li>
                <p onClick={(_) => navigate("/route=account/edit")}>Edit your account information</p>
              </li>
              <li>
                <p onClick={(_) => navigate("/route=account/password")}>Change your password</p>
              </li>
            </List>
            <h2>Orders</h2>
            <List>
              <li>
                <p onClick={(_) => navigate("/route=account/order")}>Order History</p>
              </li>
            </List>
            <h2>User</h2>
            <List>
              <li>
                <p onClick={()=>logoutClick()}>Logout</p>
              </li>
            </List>
          </ContentDiv>
        ) : (
          <ContentDiv>
            <h2>User</h2>
            <List>
              <li>
                <p onClick={(_) => navigate("/route=account/login")}>Login</p>
              </li>
              <li>
                <p onClick={(_) => navigate("/route=account/register")}>Register</p>
              </li>
            </List>
          </ContentDiv>
        )}
      </Content>
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(userActions.getUser, dispatch),
      getSettings: bindActionCreators(settingsActions.getSettings, dispatch),
      logoutUser : bindActionCreators(userActions.logoutUser,dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    settings: state.settingReducer,
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
