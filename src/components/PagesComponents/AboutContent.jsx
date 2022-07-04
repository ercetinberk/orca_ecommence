
import styled from "styled-components";

//#region Styles

const Container = styled.div`
`;
const WhyUsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #eaeaea !important ;
  padding: 40px 80px;
  & p {
    color: black;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 26px;
    text-decoration: none;
    display: block;
  }
  & h4 {
    line-height: 26px;
    text-align: start;
    color: #1e73be;
    font-family: "Poppins", sans-serif;
    font-size: 42px;
    font-weight: 700;
    text-transform: capitalize;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;
const DivContent = styled.div`
  width: 50%;
  margin: 1rem;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;
const ContactUsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4rem;
 
  font-family: "Raleway", sans-serif;
  background-image: url(http://www.expofoodsmidlands.co.uk/wp-content/uploads/2021/11/Contact-expofoodsmidlands.co_.uk-.jpg?id=11) !important;
  & p {
    color: black;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 26px;
    text-decoration: none;
    display: block;
  }
  & h2 {
    margin-bottom: 2rem;
    color: #ffffff;
    font-size: 42px;
    font-weight: 700;
    text-transform: capitalize;
  }
  & h4 {
    color: #ffffff;
    font-size: 15px;
    line-height: 1.58em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
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
  &:focus {
    outline: none !important;
    border-color: white;
  }
`;
const MultiInput = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px;
  height: 15vw;
  border-color: lightgray;
  border-style: solid;
  text-align: start;
`;
const Button = styled.input`
  color: darkgreen;
  font-size: 15px;
  font-weight: 600;
  border: none;
  padding: 15px 20px;
  background-color: #f7f7f7;
  opacity: 80%;
  margin-bottom: 10px;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
//#endregion
function AboutContent() {

  return (
    <Container>
    
      <WhyUsDiv>
        <DivContent>
          <h4> Why Us ?</h4>
        </DivContent>
        <DivContent>
          <p>
            We offer a salesman to your door service – so that you can receive
            tailor-made professional expert advice regarding pricing and
            competition, also to get precisely what you need, when you need it,
            so no need to worry about stocks piling up.
          </p>
          <p>
            All of our vehicles are temperature controlled, so you can have your
            products in the best possible state, we understand that food and
            freshness go hand in hand.
          </p>
          <p>
            We offer a Cash &amp; Carry service as well as delivery so really no
            job is too big nor too small for us.
          </p>
          <p>
            Our depots are strategically based in Poland, London and Doncaster –
            allowing us to have effective national coverage so we can fully
            support customers needs, no job is too difficult.
          </p>
        </DivContent>
      </WhyUsDiv>
    </Container>
  );
}

export default AboutContent;
