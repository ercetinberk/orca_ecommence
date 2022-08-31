import { Badge } from "@material-ui/core";
import { styled } from "@material-ui/core";
import { colors } from "../res/values/values";

export const RenderIf = ({ children, isTrue }) => {
  return isTrue ? children : null;
};
export const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: colors.primaryColor,
    fontSize: 12,
    height: 24,
    minWidth: 24,
  },
});

export const customerDeliveryMethodControl = (cartList) => {
  return cartList.length > 0  ? true : false;
};
export const getFormattedDate = (date) => {
  try{
    const dateArray = date.split('T')
    const dateValues = dateArray[0].split('-')
    return `${dateValues[2]}/${dateValues[1]}/${dateValues[0]}`
  }catch(ex){
    return ''
  }
  
};
export const  validateInfo= (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name required';
  }
  
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.message.trim()) {
    errors.message = 'Message required';
  }
  /*
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.password2) {
    errors.password2 = 'Password is required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }
  */
  return errors;
}
export const  validateMailInfo= (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  return errors;
}
export const  loginValidateInfo= (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
}
export const  registerValidateInfo= (values) => {
  let errors = {};
  if (!values.companyname) {
    errors.companyname = 'Company Name is required';
  }
  if (!values.address) {
    errors.address = 'Company Name is required';
  }
  if (!values.postcode) {
    errors.postcode = 'Post Code is required';
  }
  if (!values.city) {
    errors.city = 'City is required';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (!values.firstname) {
    errors.firstname = 'First Name is required';
  }
  if (!values.lastname) {
    errors.lastname = 'Last Name is required';
  }
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.telephone) {
    errors.telephone = 'Telephone is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Password Confirm is required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match';
  }
  return errors;
}
export function getOperatingSystem() {
  let operatingSystem = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
  if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }

  return operatingSystem;
}
