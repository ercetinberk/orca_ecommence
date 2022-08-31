import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors,API_URL } from "../../res/values/values";
import OrcaModal from "../Modal/OrcaModal";
import useForm from "../../utilities/hooks/useForm";
import { registerValidateInfo } from "../../utilities/helpers";
//#region Styles
const Container = styled.div`
  min-height: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
`;
const Title = styled.div`
  color: ${colors.primaryColor};
  font-size: 24px;
  font-weight: 500;
`;
const Label = styled.div`
  width: 100%;
  color: #333;
  font-size: 18px;
  font-weight: 300;
  margin-top: 20px;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
`;
const Link = styled.a`
  color: ${colors.primaryColor};
  text-decoration: none;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const InputElement = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 90%;
  margin: 10px 10px;
  @media only screen and (min-width: 900px) {
    min-width: 40%;
  }
`;
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px;
  border-color: lightgray;
  border-style: solid;
  max-height: 1.1rem;
  &:focus {
    outline: none !important;
    border-color: ${colors.primaryColor};
  }
`;
const Agreement = styled.span`
  width: 100%;
  font-size: 14px;
  margin: 20px 0;
`;
const Button = styled.input`
  border: none;
  padding: 15px 20px;
  background-color: ${colors.primaryColor};
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Error = styled.div`
  text-align: center;
  padding: 5px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
  margin: 1rem;
`;
const ValidateError = styled.p`
  color: ${colors.errorcolor};
  margin-left: 10px;
  font-size: 0.8rem;
`;

const SuccessContainer = styled.div`
  min-height: 40vw;
  display: flex;
  justify-content: flex-start;
`;
const SuccessWrapper = styled.div`
  padding: 20px;
  width: 60%;
  background-color: white;
`;
const SuccessLabel = styled.h1`
  color: ${colors.primaryColor};
  width: 100%;
  font-size: 24px;
  margin: 20px 0;
`;
const SuccessAgreement = styled.span`
  width: 100%;
  font-size: 16px;
  margin: 20px 0;
`;
const SuccessLink = styled.a`
  color: ${colors.primaryColor};
  text-decoration: none;
`;
//#endregion
function RegisterForm(props) {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userRegisterFunc = async (values) => {
    if (checkTerms) {
      let newUser = {
        companyname: values.companyname,
        address: values.address,
        address2: values.address2,
        postcode: values.postcode,
        city: values.city,
        country: values.country,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        password: values.password,
      };
      let url = `${API_URL}/auth/register`;
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setRegisterError("");
            navigate("/route=account/register?success=true");
            return true;
          } else {
            setRegisterError(res.message);
            return false;
          }
        });
    } else {
      setRegisterError("Warning: You must agree to the Terms & Conditions!");
      return false;
    }
  };
  const { handleChange, handleSubmit, values, errors } = useForm(
    userRegisterFunc,
    registerValidateInfo
  );
  if (props.success) {
    return (
      <SuccessContainer>
        <SuccessWrapper>
          <SuccessLabel>Your Account Has Been Created!</SuccessLabel>
          <SuccessAgreement>
            Thank you for registering with Vista Foods!
          </SuccessAgreement>
          <SuccessAgreement>
            You will be notified by e-mail once your account has been activated
            by the store owner.
          </SuccessAgreement>
          <SuccessAgreement>
            If you have ANY questions about the operation of this online shop,
            please{" "}
            <SuccessLink  onClick={(_) => {navigate("/");}} >
              contact the store owner
            </SuccessLink>
            .
          </SuccessAgreement>
        </SuccessWrapper>
      </SuccessContainer>
    );
  } else {
    return (
      <div>
        <OrcaModal isOpen={open} onClose={handleClose}>
          <Title>Terms & Conditions</Title>
          <p>
            Terms & Conditions Committee is threatening to fracture along
            partisan lines as the sides accuse one another of playing politics
            with the investigation into alleged Russian attempts to meddle in
            the 2016 elections and whether President Donald Trump's associates
            colluded with Moscow. It is just the latest development in the
            ever-evolving saga about alleged Russian tampering in the 2016
            presidential election. CNN has compiled a list of the growing and
            diverse cast characters at the start of a critical week of hearings
            for Senate investigators looking into Russia's actions and its
            possible ties to Trump associates. Several US lawmakers and agency
            heads have emerged as visible, and at times controversial, figures
            in the investigations into connections between individuals in
            Trump's orbit and Russian hacking of Democratic Party groups
            including the Democratic National Committee and Clinton campaign
            adviser John Podesta.
          </p>
          <p>
            <button onClick={() => handleClose()}>Close</button>
          </p>
        </OrcaModal>
        {registerError !== "" ? <Error>{registerError}</Error> : <div></div>}
        <Container>
          <Wrapper>
            <Title>Register Account</Title>
            <Agreement>
              If you already have an account with us, please login at the{" "}
              <Link href="/login">login page.</Link>
            </Agreement>
            <Label>Your Personal Details</Label>
            <Form onSubmit={handleSubmit}>
              <InputElement>
                <Input
                  name="companyname"
                  placeholder="* Company Name"
                  onChange={handleChange}
                  value={values.companyname}
                />
                {errors.companyname && (
                  <ValidateError>{errors.companyname}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="address"
                  placeholder="* Address"
                  onChange={handleChange}
                  value={values.address}
                />
                {errors.address && (
                  <ValidateError>{errors.address}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="address2"
                  placeholder="Address 2"
                  onChange={handleChange}
                  value={values.address2}
                />
              </InputElement>
              <InputElement>
                <Input
                  name="postcode"
                  placeholder="* Post Code"
                  onChange={handleChange}
                  value={values.postcode}
                />
                {errors.postcode && (
                  <ValidateError>{errors.postcode}</ValidateError>
                )}
              </InputElement>

              <InputElement>
                <Input
                  name="city"
                  placeholder="* City"
                  onChange={handleChange}
                  value={values.city}
                />
                {errors.city && <ValidateError>{errors.city}</ValidateError>}
              </InputElement>
              <InputElement>
                <Input
                  name="country"
                  placeholder="* County"
                  onChange={handleChange}
                  value={values.country}
                />
                {errors.country && (
                  <ValidateError>{errors.country}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="firstname"
                  placeholder="* First Name"
                  onChange={handleChange}
                  value={values.firstname}
                />
                {errors.firstname && (
                  <ValidateError>{errors.firstname}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="lastname"
                  placeholder="* Last Name"
                  onChange={handleChange}
                  value={values.lastname}
                />
                {errors.lastname && (
                  <ValidateError>{errors.lastname}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="email"
                  type="email"
                  placeholder="* E-mail"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && <ValidateError>{errors.email}</ValidateError>}
              </InputElement>
              <InputElement>
                <Input
                  name="telephone"
                  placeholder="* Telephone"
                  onChange={handleChange}
                  value={values.telephone}
                />
                {errors.telephone && (
                  <ValidateError>{errors.telephone}</ValidateError>
                )}
              </InputElement>

              <Label>Your Password</Label>
              <InputElement>
                <Input
                  name="password"
                  type="password"
                  placeholder="* Password"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && (
                  <ValidateError>{errors.password}</ValidateError>
                )}
              </InputElement>
              <InputElement>
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="* Password Confirm"
                  onChange={handleChange}
                  value={values.passwordConfirm}
                />
                {errors.passwordConfirm && (
                  <ValidateError>{errors.passwordConfirm}</ValidateError>
                )}
              </InputElement>

              <Agreement>
                I have read and agree to the{" "}
                <Link onClick={() => handleOpen()}>Terms & Conditions</Link>{" "}
                <Checkbox
                  sx={{
                    color: colors.primaryColor,
                    "&.Mui-checked": {
                      color: colors.primaryColor,
                    },
                  }}
                  onClick={() => {
                    setCheckTerms(!checkTerms);
                  }}
                  value={checkTerms}
                />
              </Agreement>

              <Button type="submit" value="Create"></Button>
            </Form>
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default RegisterForm;
