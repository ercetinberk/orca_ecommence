import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import {colors} from "../../res/values/values"
//#region STYLES

const Container = styled.div`
  min-height: 10rem;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;
const Button = styled.div`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  background-color: ${colors.primaryColor};
  border-color: #dddddd #dddddd #b3b3b3 #b7b7b7;
  color: #fff;
  border-radius: 2px;
  margin: 2px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color:${colors.darkcolor};
  }
`;
const Title = styled.span`
  font-size: 1rem;
  color: ${colors.primaryColor};
  font-weight: 500;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
  flex: 3;
`;
//#endregion

export default function DeliveryMethodComponents(props) {

  const handleChange = async (event) => {
    await props.changeDeliveryMethod(event.target.value)
    props.setDeliveryMethod(event.target.value);
  };

  return (
    <Container>
      <FormControl>
        <Title>
          Please select the preferred shipping method to use on this order.
        </Title>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.deliveryMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Delivery"
            control={<Radio sx={{
                color: colors.primaryColor,
                '&.Mui-checked': {
                  color:colors.primaryColor,
                },
              }}/>}
            label="Delivery"
          />
          <FormControlLabel
            value="Collection"
            control={<Radio sx={{
                color: colors.primaryColor,
                '&.Mui-checked': {
                  color: colors.primaryColor,
                },
              }} />}
            label="Collection"
          />
        </RadioGroup>
      </FormControl>
      <ButtonContainer>
        <Button onClick={()=>{props.changeOpenStatus(true)}}>Continue</Button>
      </ButtonContainer>
    </Container>
  );
}
