/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from "styled-components";
import { Info } from "@material-ui/icons";
import { colors } from "../res/values/values";

const Container = styled.div`
  background-color: #333;
  color: ${colors.whiteColor};
  font-size: 16px;
  font-weight: 400;
  padding: 10px 5px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Announcement() {
  return (
    <Container>
      <Info style={{ paddingRight: "5px" }} />{" "}
      THIS WEEK ONLY! 30 MAY-4 JUNE 2022 SPECIAL OFFERS
    </Container>
  );
}
/*
<p>We moved to our new address !</p>

<marquee behavior="scroll" direction="left">
      OPEN 24/7 to public - Order by Phone 24/7 020 3937 6970 - 074 9421 4847
      </marquee>
*/
export default Announcement;
