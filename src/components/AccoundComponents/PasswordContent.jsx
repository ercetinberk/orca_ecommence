import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, API_URL } from "../../res/values/values";
const Container = styled.div`
  min-height: 40vw;
  display: flex;
  padding-top: 20px;
  flex-direction: column;
`;
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
`;
const Title = styled.div`
  color: ${colors.primaryColor};
  font-size: 24px;
  font-weight: 500;
`;
const Label = styled.div`
  width: 100%;
  color: #333;
  font-size: 18px;
  font-weight: 300;
  margin-top: 20px;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 20px 10px 0 0;
  padding: 10px;
  border: 1px;
  border-color: lightgray;
  border-style: solid;
  &:focus {
    outline: none !important;
    border-color: ${colors.primaryColor};
  }
`;
const Button = styled.input`
  border: none;
  min-width: 80%;
  margin: 20px 10px 0 0;
  padding: 15px;
  background-color: ${colors.primaryColor};
  color: white;
  cursor: pointer;
`;
const Error = styled.div`
  text-align: center;
  padding: 5px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
function PasswordContent(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  let l_user = props.currentUser;
  let userId = props.id;
  const onChangeHandler = (event) => {
    //setUserName(event.target.value)
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "password":
        setPassword(value);
        setError("");
        break;
      case "passwordConfirm":
        setPasswordConfirm(value);
        setError("");
        break;
      default:
      // code block
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    editUser();
  };
  const editUser = async () => {
    if (password !== passwordConfirm) {
      setError("Password confirmation does not match password!");
    } else {
      if (userId) {
        const user = {
          id: userId,
          password: password,
        };
        let url = `${API_URL}/auth/resetPassword`;
        await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((res) => {
            navigate("/route=account/login");
          })
          .catch((err) => {
            let error = JSON.parse(err.message);
            console.log("CATCH : " + error);
          });
      } else {
        const user = {
          id: l_user.id,
          password: password,
        };
        const access_token = localStorage.getItem("access_token");
        let url = `${API_URL}/auth/changePassword`;
        await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer: ${access_token}`,
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((res) => {
            navigate("/route=account/edit");
          })
          .catch((err) => {
            let error = JSON.parse(err.message);
            console.log("CATCH : " + error);
          });
      }
    }
  };
  //const { register, handleSubmit, watch, errors } = useForm();
  return (
    <div>
      <Container>
        {error !== "" && <Error>{error}</Error>}
        <Wrapper>
          <Title>Change Password</Title>
          <Label>Your Password</Label>
          <Form onSubmit={onSubmitHandler}>
            <Input
              name="password"
              required="required"
              type="password"
              placeholder="* Password"
              onChange={onChangeHandler}
            />
            <Input
              name="passwordConfirm"
              required="required"
              type="password"
              placeholder="* Password Confirm"
              onChange={onChangeHandler}
            />

            <Button type="submit" value="Save"></Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
}

export default PasswordContent;
