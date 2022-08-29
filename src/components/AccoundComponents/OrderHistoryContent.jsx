/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import * as settingsActions from "../../redux/actions/settingsActions";
import CheckOutAccordionMenu from "../CheckOutPageComponents/CheckOutAccordionMenu";
import OrderListComponent from "../OrderComponents/OrderListComponent";
import OrderLineListComponent from "../OrderComponents/OrderLineListComponent";
import { useNavigate } from "react-router-dom";
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
  margin: 5px;
  width: 88.5%;
  padding: 10px;
  color: #18531e;
  background-color: #c5e3c6;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
const Error = styled.div`
  margin: 5px;
  width: 88.5%;
  padding: 10px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  font-size: 16px;
  font-weight: 300;
`;
//#endregion

function OrderHistoryContent(props) {
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAPI() {
      setLoading(true);
      await props.actions.getSettings();
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        await props.actions.getUser();
        if (!props.document_no) {
          await getPendingOrders();
          await getCompletedOrders();
        }
        else{
          if(props.type==='pending')
            await getSelectedOrderLines();
          else
            await getSelectedCompletedOrderLines()
        } 
      }
      else
        navigate('/')
      setLoading(false);
    }
    getAPI();
    return () => {
      //alert('DEAD')
    };
  }, [props.document_no]);
  const getPendingOrders = async () => {
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/order/pendingorders/`;
    await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPendingOrders([...res.message.data]);
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        console.log("CATCH : " + error);
      });
  };
  const getCompletedOrders = async () => {
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/order/completedorders/`;
    await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompletedOrders([...res.message.data]);
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        console.log("CATCH : " + error);
      });
  };
  const getSelectedOrderLines = async () => {
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/order/pendingorders/${props.document_no}/lines`;
    await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOrderLines([...res.message.data]);
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        console.log("CATCH : " + error);
      });
  };
  const getSelectedCompletedOrderLines = async () => {
    const access_token = localStorage.getItem("access_token");
    let url = `${API_URL}/order/completedorders/${props.document_no}/lines`;
    await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer: ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOrderLines([...res.message.data]);
      })
      .catch((err) => {
        let error = JSON.parse(err.message);
        console.log("CATCH : " + error);
      });
  };
  return (
    <div>
      {!loading ? (
        props.document_no ? (
          <Container>
              <OrderLineListComponent lines={orderLines} />
          </Container>
        ) : (
          <Container>
            <CheckOutAccordionMenu
              isActive={true}
              key={"COT1"}
              a={"COT1"}
              item={{
                title: "Pending Orders",
                content: <OrderListComponent orders={pendingOrders} type={'pending'} />,
              }}
            />
            <CheckOutAccordionMenu
              isActive={true}
              key={"COT2"}
              a={"COT2"}
              item={{
                title: "Completed Orders",
                content: <OrderListComponent orders={completedOrders} type={'completed'} />,
              }}
            />
          </Container>
        )
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
    },
  };
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistoryContent);
