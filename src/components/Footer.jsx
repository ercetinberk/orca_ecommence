import { Divider } from "@material-ui/core";
import { AddLocation, Call, Email,Facebook,Twitter } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  background-color:#111;
  width: 100%;
`;
const Top = styled.div`
  padding: 10px;
  display: flex;
  margin: 0 5px;
  justify-content: flex-start;
  flex-direction:column ;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    margin: 0 40px;
  }

`;
const ColumnList = styled.ul`
  list-style-type: none;
  margin-left: 10px;
  margin-right:10px ;
  padding: 0;
`;
const ColumnListTitle = styled.li`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
`;
const ColumnListItem = styled.li`
  margin-bottom: 5px;
  letter-spacing: 1px;
  display: flex;
`;
const Bottom = styled.div`
    padding:5px ;
    background-color: #1e54aa;
   
  & p {
    margin: 8px 0;
    color: #ffffff;
    font-size: 0.8rem;
    & a {
      color: #ffffff;
      font-size: 0.8rem;
    }
  }
`;
function Footer() {
  return (
    <Container>
      <Top>
        <ColumnList>
          <ColumnListTitle>Contact Us</ColumnListTitle>
          <ColumnListItem>
            <AddLocation style={{ marginRight: "5px" }} />
            Unit 4C, 4D Whiterose Park, Railway Court, Ten Pound Walk Doncaster,DN4 5FB, United Kingdom.
          </ColumnListItem>
          <ColumnListItem>
            <Call style={{ marginRight: "5px" }} />
            +441302 325890
          </ColumnListItem>
          <ColumnListItem>
            <Email style={{ marginRight: "5px" }} />
            info@expofoodsmidlands.co.uk
          </ColumnListItem>
        </ColumnList>
        <ColumnList>
          <ColumnListTitle>Follow Us</ColumnListTitle>
          <ColumnListItem>
            <Facebook style={{ marginRight: "5px" }} />
            Facebook
          </ColumnListItem>
          <ColumnListItem>
            <Twitter style={{ marginRight: "5px" }} />
            Twitter
          </ColumnListItem>
          
        </ColumnList>
        <ColumnList>
          <ColumnListTitle>About Us</ColumnListTitle>
          <ColumnListItem>
            Contact
          </ColumnListItem>
          <ColumnListItem>
            About
          </ColumnListItem>
        </ColumnList>
      </Top>
      <Divider style={{ margin: "5px 0" }} />

      <Bottom>
      <p>Powered By <a href="http://www.orcabs.com">Orca Business Solutions Ltd.  -  </a> Expo Foods(Midlands) Ltd. © 2022</p>
      </Bottom>
      <Divider style={{ margin: "5px 0" }} />
    </Container>
  );
}

export default Footer;
