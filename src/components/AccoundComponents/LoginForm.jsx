import styled from "styled-components";
import {colors} from "../../res/values/values"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import useForm from "../../utilities/hooks/useForm";
import {loginValidateInfo} from '../../utilities/helpers';
//#region STYLES

const Container = styled.div`
  min-height: 40vw; 
  display: flex;
  flex-direction: column;
 
  padding-top: 20px;
`;
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;
const Error = styled.div`
  padding: 5px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;  
  border: 1px;
  border-color: lightgray;
  border-style: solid;
  &:focus  {
    outline: none !important;
    border-color: ${colors.primaryColor};
  }
`;
const Button = styled.input`
  border: none;
  padding: 15px 20px;
  background-color: ${colors.primaryColor};
  color: white;
  margin-bottom: 10px;
`;
const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
//#endregion

function Login(props) {
  const userLoginFunc = async (values) => {
    
    let user={
      "email":values.email,
      "password":values.password
    }
    if(await props.actions.loginUser(user)){
      props.goBack()
      return true
    }else 
      return false
   
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    userLoginFunc,
    loginValidateInfo
  );
  return (
    <Container>
      {(props.loginError!=="") ? <Error>{props.loginError}</Error> : <div></div>}
      <Wrapper>
        
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="email" onChange={handleChange} type="text" placeholder="email" value={values.email}/>
          {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
          <Input name="password" onChange={handleChange} type="password" placeholder="password" value={values.password}/>
          {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
          <Button type="submit" value="Login"></Button>
          <Link onClick={()=>{}}>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loginUser : bindActionCreators(userActions.loginUser,dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    loginError: state.currentUserErrorReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
