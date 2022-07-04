import styled from "styled-components";
import CheckOutContent from "../components/CheckOutPageComponents/CheckOutContent";
import Header from "../components/Header";
import MenuBar from "../components/MenuComponents/MenuBar";
import Footer from "../components/Footer";
const Container = styled.div``;
function Checkout() {
  return (
    <Container>
      <Header />
      <MenuBar />
      <CheckOutContent/>
      <Footer />
    </Container>
  );
}

export default Checkout;
