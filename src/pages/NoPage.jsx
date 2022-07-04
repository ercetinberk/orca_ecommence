import styled from "styled-components";
import {colors} from "../res/values/values"
const Container = styled.div`
  min-height: 40vw;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.h1`
  font-size: 6vw;
  color: ${colors.primaryColor};
  font-weight: 700;

`;
const Text = styled.span`
  font-size: 3vw;
  color: black;
  font-weight: 600;

`;
function NoPage() {
  return (
    <Container>
      <Label>404</Label>
      <Text>Page Not Found</Text>
    </Container>
  );
}

export default NoPage;
