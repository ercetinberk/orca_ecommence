import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";

import EditComponent from "../components/AccoundComponents//EditComponent";
import LoginForm from "../components/AccoundComponents/LoginForm";
import OrderHistoryContent from "../components/AccoundComponents/OrderHistoryContent";
import PasswordContent from "../components/AccoundComponents//PasswordContent";
import LogoutForm from "../components/AccoundComponents//LogoutForm";
import RegisterForm from "../components/AccoundComponents//RegisterForm";
import SuccessContent from "../components/AccoundComponents/SuccessContent";
import ForgotPassword from "../components/AccoundComponents/ForgotPassword";
import {useParams,useSearchParams,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountMenu from "../components/AccoundComponents/AccountMenu"
import * as settingsActions from "../redux/actions/settingsActions";
import * as userActions from "../redux/actions/userActions";
import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";

const Container = styled.div`
  display:flex ;
  flex:1 ;
  flex-direction:column ;
  min-height: ${(props) => props.height}px;
  justify-content:space-between ;
`;
const TwoColumn = styled.div`
  display: flex;
  flex:1;
  justify-content:flex-start ;
  flex-direction:column ;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;
const LeftDiv = styled.div`
 @media only screen and (min-width: 600px) {
    width: 20rem; 
  }
   
`;
const RightDiv = styled.div`
  width: 100%;
`;
function MyAccount(props) {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  let params = useParams();
  const navigate = useNavigate();
  const { height } = useWindowWidthAndHeight();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  useEffect(() => {
    const componentDidMount = async () => {
        await props.actions.getSettings();
        const access_token = localStorage.getItem("access_token");
        if(access_token)
            await props.actions.getUser()
        setLoading(false);
      }
    componentDidMount()
  }, []);
  const goBackForLogin= () =>{
    navigate(-1)
  }
  return (
    <Container height={height}>
      <div>
        <Header />
        <MenuBar />
      </div>
      
      {!loading ? (
        <TwoColumn>
        <LeftDiv>
          <AccountMenu/>
        </LeftDiv>
        <RightDiv>
          {(params.page==="login") && <LoginForm goBack={goBackForLogin}/>}
          {(params.page==="register") && <RegisterForm success={searchParams.get("success")}/>}
          {(params.page==="password") && <PasswordContent currentUser={props.currentUser} id={searchParams.get("id")}/>}
          {(params.page==="forgotPassword") && <ForgotPassword/>}
          {(params.page==="order") && <OrderHistoryContent document_no={searchParams.get("id")} type={searchParams.get("type")} />}
          {(params.page==="logout") && <LogoutForm/>}
          {(params.page==="success") && <SuccessContent/>}
          {(params.page==="edit") && <EditComponent currentUser={props.currentUser}/>}
        </RightDiv>
        </TwoColumn>
        
      ) : (
        <Container/>
      )}
      <Footer />
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSettings: bindActionCreators(settingsActions.getSettings, dispatch),
      getUser : bindActionCreators(userActions.getUser,dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
