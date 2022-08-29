/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import * as settingsActions from "../../redux/actions/settingsActions";
import * as cartActions from "../../redux/actions/cartActions";
import CheckOutAccordionMenu from "./CheckOutAccordionMenu";
import ConfirmOrderComponent from "./ConfirmOrderComponent";
import DeliveryDetailsComponent from "./DeliveryDetailsComponent";
import DeliveryMethodComponents from "./DeliveryMethodComponents";
import OrcaModal from "../Modal/OrcaModal"
import Charge from "../../pages/Charge"
import {API_URL} from "../../res/values/values"
//#region STYLES
const Container = styled.div`
  min-height: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
`;
const CollectionDiscount = styled.div`
  margin: 5px ;
  width:88.5% ;
  padding: 10px;
  color: #18531e;
  background-color: #c5e3c6;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
const Error = styled.div`
  margin: 5px ;
  width:88.5% ;
  padding: 10px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
 
`;
//#endregion

function CheckOutContent(props) {
  const navigate = useNavigate()
  const [deliveryDetailsOpenStatus, setDeliveryDetailsOpenStatus] =useState(true);
  const [deliveryMethodOpenStatus, setDeliveryMethodOpenStatus] =useState(false);
  const [confirmOrderOpenStatus, setConfirmOrderOpenStatus] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [checkOutError, setCheckOutError] = useState('');
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }


  useEffect(() => {
    async function getAPI() {
      await props.actions.getSettings();
      (props.cart.length > 0 )  ? setDeliveryMethod(props.cart[0].deliverymethod) : setDeliveryMethod('')
      const access_token = localStorage.getItem("access_token");
      if (access_token) await props.actions.getUser();
      setLoading(false);
      debugger
    }
    getAPI()
    return  () => {
      //alert('DEAD')
    };
  }, []);

  const continueDeliveryDetails = (status) => {
    setDeliveryDetailsOpenStatus(!status);
    setDeliveryMethodOpenStatus(status);
  };
  const continueDeliveryMethod = (status) => {
    setDeliveryMethodOpenStatus(!status);
    setConfirmOrderOpenStatus(status);
  };
  const changeDeliveryMethod = async(deliverymethod)=>{
    await props.actions.updateCartDeliveryMethod(deliverymethod)
  }
  const getTotalAmount = () => {
    let totalAmountInclVat = 0;
    props.cart.map((item) => (totalAmountInclVat += item.lineamountinclvat));
    return totalAmountInclVat.toFixed(2);
  };
  const confirmOrder = async () => {
    if(props.settings.payment)
      handleOpen()
    else{
         
    let user ={
      id:props.currentUser.id,
      customerno:props.currentUser.customerno,
      email:props.currentUser.email,
      address:(selectedAddress !== '')?selectedAddress : props.currentUser.adrressList[0].value,
      deliveryMethod:deliveryMethod
    }
    //console.log(user);
    //await props.actions.checkOutOrder(user)
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/cart/checkout`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success)  
          navigate('/')  
        else{
          setCheckOutError(res.message)
          if(res.message === "You are not authorization to access this route"){
            console.log("You are not authorization to access this route");
            navigate('/route=account/login')
          }
            
        }
      })
      . catch((err) => {
        let error = JSON.parse(err.message);
        console.log('CATCH : '+error);
      });
    }
  };
  const confirmOrderWithPayment = async () => {
    debugger
    let user ={
      id:props.currentUser.id,
      customerno:props.currentUser.customerno,
      email:props.currentUser.email,
      address:(selectedAddress !== '')?selectedAddress : props.currentUser.adrressList[0].value,
      deliveryMethod:deliveryMethod
    }
    //console.log(user);
    //await props.actions.checkOutOrder(user)
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/cart/checkout`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success)  
          navigate('/route=account/success')   
        else{
          setCheckOutError(res.message)
          if(res.message === "You are not authorization to access this route"){
            console.log("You are not authorization to access this route");
            navigate('/route=account/login')
          }
            
        }
      })
      . catch((err) => {
        let error = JSON.parse(err.message);
        console.log('CATCH : '+error);
      });
  };
  return (
    <div>
      {!loading ? (
        <Container>
          <OrcaModal isOpen={open} onClose={handleClose}>
            <Charge totalPayment={getTotalAmount} confirmOrderWithPayment={confirmOrderWithPayment} user ={
              {
                name:props.currentUser.firstname,
                email:props.currentUser.email,
                address:(selectedAddress !== '')?selectedAddress : props.currentUser.adrressList[0].value,
              }
            }/>
          </OrcaModal>
          {(deliveryMethod==='Collection') && <CollectionDiscount>Collection Discount</CollectionDiscount>}
          {(checkOutError !== '') && <Error>{checkOutError}</Error>}
          <CheckOutAccordionMenu
            isActive={deliveryDetailsOpenStatus}
            key={"COT1"}
            a={"COT1"}
            item={{
              title: "Delivery Details",
              content: (
                <DeliveryDetailsComponent
                  changeOpenStatus={continueDeliveryDetails}
                  dropDownList={(props.currentUser.adrressList)?[...props.currentUser.adrressList] : []}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              ),
            }}
          />
          <CheckOutAccordionMenu
            isActive={deliveryMethodOpenStatus}
            key={"COT2"}
            a={"COT2"}
            item={{
              title: "Delivery Method",
              content: (
                <DeliveryMethodComponents
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  changeOpenStatus={continueDeliveryMethod}
                  changeDeliveryMethod={changeDeliveryMethod}
                />
              ),
            }}
          />
          <CheckOutAccordionMenu
            isActive={confirmOrderOpenStatus}
            key={"COT3"}
            a={"COT3"}
            item={{
              title: "Confirm Order",
              content: <ConfirmOrderComponent confirmOrderClick={confirmOrder} />,
            }}
          />
        </Container>
      ) : (
        <Container></Container>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(userActions.getUser, dispatch),
      getSettings: bindActionCreators(settingsActions.getSettings, dispatch),
      updateCartDeliveryMethod: bindActionCreators(cartActions.updateCartDeliveryMethod, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
    cart: state.cartActionReducer,
    settings: state.settingReducer
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutContent);
