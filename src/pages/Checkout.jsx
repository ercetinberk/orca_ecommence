import styled from "styled-components";
import CheckOutContent from "../components/CheckOutPageComponents/CheckOutContent";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import Footer from "../components/Footer";
import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";
const Container = styled.div`
  display:flex ;
  flex:1 ;
  flex-direction:column ;
  min-height: ${(props) => props.height}px;
  justify-content:space-between ;
`;
function Checkout() {
  const { height } = useWindowWidthAndHeight();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <Container height={height}>
      <div>
        <Header />
        <MenuBar />
      </div>
      <CheckOutContent/>
      <Footer />
    </Container>
  );
}

export default Checkout;
