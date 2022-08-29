import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors,API_URL } from "../../res/values/values";
const Container = styled.div`
  min-height: 40vw;     
  display: flex;
 
  padding-top: 20px;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
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
  flex-direction:column ;
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
function EditComponent(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(props.currentUser.firstname);
  const [lastName, setLastName] = useState(props.currentUser.lastname);
  const [eMail, setEMail] = useState(props.currentUser.email);
  const [telephone, setTelephone] = useState(props.currentUser.telephone);
  let l_user = props.currentUser
  const onChangeHandler = (event) => {
    //setUserName(event.target.value)
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "email":
        setEMail(value);
        break;
      case "telephone":
        setTelephone(value);
        break;
      default:
      // code block
    }
  };
  const onSubmitHandler =  (event) => {
    event.preventDefault();
    editUser()

  };
  const editUser = async () => {
    l_user.firstname=firstName
    l_user.lastname=lastName
    l_user.email=eMail
    l_user.telephone=telephone
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/auth/edit`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
      body: JSON.stringify(l_user),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/route=account/edit")
      })
      . catch((err) => {
        let error = JSON.parse(err.message);
        console.log('CATCH : '+error);
      });
  };
  //const { register, handleSubmit, watch, errors } = useForm();
  return (
    <div>
      <Container>
        <Wrapper>
          <Title>My Account Information</Title>
          <Label>Your Personal Details</Label>
          <Form onSubmit={onSubmitHandler}>
            <Input
              name="firstname"
              required="required"
              value={firstName}
              placeholder="* First Name"
              onChange={onChangeHandler}
            />
            <Input
              name="lastname"
              required="required"
              value={lastName}
              placeholder="* Last Name"
              onChange={onChangeHandler}
            />
            <Input
              name="email"
              required="required"
              value={eMail}
              type="email"
              placeholder="* E-mail"
              onChange={onChangeHandler}
            />
            <Input
              name="telephone"
              required="required"
              value={telephone}
              placeholder="* Telephone"
              onChange={onChangeHandler}
            />
            <Button type="submit" value="Save"></Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
}

export default EditComponent;
