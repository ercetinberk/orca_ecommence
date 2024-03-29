
import styled from "styled-components";
import useForm from "../../utilities/hooks/useForm";
import {validateInfo} from '../../utilities/helpers';

//#region Styles

const Container = styled.div`
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

//#endregion
function ContactContent(props) {
  const { handleChange, handleSubmit, values, errors } = useForm(
    props.sendMail,
    validateInfo
  );
  return (
    <Container>
      <ContactUsDiv>
        <DivContent>
          <h2> Contact Us</h2>
          <h4>
            If you want to find out what’s available, buy from the market or
            sell to the market, please contact the market businesses directly –
            CLICK HERE to find their contact details.
          </h4>
          <h4>For media enquiries, call</h4>
          <h4>+441302 325890</h4>
          <h4>Fax: 01302 365517</h4>
        </DivContent>
        <DivContent>
          <Form onSubmit={handleSubmit}>
            <Input
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="email"
              value={values.email}
            />
            {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
            <Input
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="name"
              value={values.name}
            />
            {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
            <MultiInput
              name="message"
              onChange={handleChange}
              type="text"
              placeholder="your message (optional)"
              value={values.message}
            />
            {errors.message && <p style={{color:'red'}}>{errors.message}</p>}
            <Button type="submit" value="SUBMIT"></Button>
          </Form>
        </DivContent>
      </ContactUsDiv>
    </Container>
  );
}

export default ContactContent;
