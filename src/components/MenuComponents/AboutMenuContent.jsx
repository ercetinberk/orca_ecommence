import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {colors} from "../../res/values/values"
//#region Styles
const AboutMenuDiv = styled.div`
  align-items: center;
  & div:hover {
    background-color: #ddd;
  }
`;
const AboutButton = styled.div`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  align-items: center;
  color: ${colors.primaryColor};
  margin: 2px;
  padding: 5px;
  margin-top: 5px;
`;

//#endregion
const AboutMenuContent = (props) => {
  const navigate = useNavigate();
  return (
    <AboutMenuDiv>
      <AboutButton onClick={(_) => navigate("/route=about")}>About Us</AboutButton>
      <AboutButton onClick={(_) => navigate("/route=contact")}>Contact Us</AboutButton>
      <AboutButton onClick={(_) => navigate("/route=about")}>Catalog</AboutButton>
    </AboutMenuDiv>
  );
};

export default AboutMenuContent;
