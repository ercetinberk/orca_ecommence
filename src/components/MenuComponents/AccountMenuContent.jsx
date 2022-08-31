import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import {colors} from "../../res/values/values"
//#region Styles
const AccountMenuDiv = styled.div`
  align-items: center;
  & div:hover {
    background-color: #ddd;
  }
`;
const AccountButton = styled.div`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  align-items: center;
  color: ${colors.primaryColor};
  margin: 2px;
  padding: 5px;
  margin-top: 5px;
  cursor: pointer;
`;

//#endregion
const AccountMenuContent = (props) => {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/route=account/login");
  };
  const logoutClick = async () => {
    await props.actions.logoutUser()
    navigate("/route=account/logout");
  };
  return (
    <div>
      {(!props.currentUser.customerno) ? (
        <AccountMenuDiv>
          <AccountButton onClick={(_) => loginClick()}>Login</AccountButton>
          <AccountButton onClick={(_) => navigate("/route=account/register")}>
            Register
          </AccountButton>
        </AccountMenuDiv>
      ) : (
        <AccountMenuDiv>
          <AccountButton onClick={(_) => navigate("/route=account/edit")}>My Account</AccountButton>
          <AccountButton onClick={(_) => navigate("/route=account/order")}>Order History</AccountButton>
          <AccountButton onClick={(_) => logoutClick()}>Logout</AccountButton>        
        </AccountMenuDiv>
      )}
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logoutUser : bindActionCreators(userActions.logoutUser,dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuContent);
