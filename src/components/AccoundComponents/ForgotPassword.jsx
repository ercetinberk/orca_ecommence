import { useState,forwardRef } from "react";
import styled from "styled-components";
import {colors,API_URL} from "../../res/values/values"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import useForm from "../../utilities/hooks/useForm";
import {validateMailInfo} from '../../utilities/helpers';
import { useNavigate } from "react-router-dom";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MButton from '@mui/material/Button';

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

const Alert =forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ForgotPassword(props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const forgotPasswordMail = async (values) => {
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
        setOpen(true);
        setTimeout(function() {navigate("/")}, 2000);
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
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Sending email successful !
        </Alert>
      </Snackbar>
    </Stack>
    </Container>
  );
}

export default ForgotPassword;
