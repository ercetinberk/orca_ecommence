import styled from "styled-components";
import LeftSide from "../components/LeftSide";
import Products from "../components/Products";

const Container = styled.div`
  display: flex;
  flex-direction:column ;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;
function TwoColumnContent(props) {
  
  return (
    <Container>
      <LeftSide categoryid={props.categoryid} productid={props.productid} filter={props.filter} brand={props.brand} country={props.country}/>
      <Products categoryid={props.categoryid} productid={props.productid} filter={props.filter} brand={props.brand} country={props.country}/>
    </Container>
  );
}

export default TwoColumnContent;
