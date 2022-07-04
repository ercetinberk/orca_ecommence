import styled from "styled-components";
import { colors } from "../../res/values/values";
import { useNavigate } from 'react-router-dom';
const Container = styled.div``;
const Form = styled.div`
  padding: 8vw;
`;
const Label = styled.h1`
  margin-bottom: 10px;
  color: ${colors.primaryColor};
  font-weight: 500;
`;
const Text = styled.p`
  margin-bottom: 10px;
  color: #666;
  font-weight: 300;
`;
const Button = styled.button`
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  padding: 10px;
  background-color: ${colors.primaryColor};
  margin-bottom: 10px;
  margin-top: 10px;
`;
function Logout() {
  const navigate = useNavigate()
  return (
    <Container>
      <Form>
            <Label>Account Logout</Label>
            <Text>
              You have been logged off your account. It is now safe to leave the
              computer.
            </Text>
            <Text>
              Your shopping cart has been saved, the items inside it will be
              restored whenever you log back into your account.
            </Text>
            <Button onClick={()=>{navigate('/')}}>Continue </Button>
          </Form>
    </Container>
  );
}

export default Logout;
