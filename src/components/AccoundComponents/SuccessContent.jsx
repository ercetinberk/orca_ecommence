import styled from "styled-components";
import { colors } from "../../res/values/values";
import { useNavigate } from 'react-router-dom';
const Container = styled.div``;
const Form = styled.div`
    padding: 2rem;
`;
const Label = styled.h1`
  margin-bottom: 10px;
  color: ${colors.primaryColor};
  font-weight: 500;
`;
const Text = styled.p`
  margin-bottom: 10px;
  color: #666;
  font-size:1rem ;
  font-weight: 400;
`;
const Text2 = styled.p`
  margin-bottom: 10px;
  color: #969696;
  font-size:0.9rem ;
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
function SuccessContent() {
  const navigate = useNavigate()
  return (
    <Container>
      <Form>
            <Label>Thank You !</Label>
            <Text>
              Payment done Successfully.
            </Text>
            <Text2>
              You will be redirected to the home page shortly or click here to return to home page.
            </Text2>
            <Button onClick={()=>{navigate('/')}}>Continue Shopping</Button>
          </Form>
    </Container>
  );
}

export default SuccessContent;
