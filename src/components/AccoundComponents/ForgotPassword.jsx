import styled from "styled-components";
import {colors,API_URL} from "../../res/values/values"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import useForm from "../../utilities/hooks/useForm";
import {validateMailInfo} from '../../utilities/helpers';
import { useNavigate } from "react-router-dom";
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
  cursor: pointer;
`;

//#endregion

function ForgotPassword(props) {
  const navigate = useNavigate()
  const forgotPasswordMail = async (values) => {
    debugger
    let user={
      "mail":values.email,
    }
    let url = `${API_URL}/auth/forgotPasswordMail`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      . catch((err) => {
        let error = JSON.parse(err.message);
        console.log('CATCH : '+error);
      });
   
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    forgotPasswordMail,
    validateMailInfo
  );
  return (
    <Container>
      <Wrapper>
        <Title>Forgot Password</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="email" onChange={handleChange} type="text" placeholder="email" value={values.email}/>
          {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
          <Button type="submit" value="Reset Password"></Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgotPassword;
