import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as countryActions from "../../redux/actions/countryActions";
import { ArrowBack ,Close} from "@material-ui/icons";
import { colors } from "../../res/values/values";
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
function MobileMenuBarContent(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [openCountryList, setOpenCountryList] = useState(false);
  const { width,height } = useWindowWidthAndHeight();
  useEffect(() => {
    const getDatas = async () => {
      await props.actions.getCountryList();
      await props.actions.getCategories();
      setLoading(false);
    };
    getDatas();
  }, []);
  const _openCategory = () => {
    setOpenCategoryList(true);
    setOpenCountryList(false);
  };
  const _openCountry = () => {
    setOpenCountryList(true);
    setOpenCategoryList(false);
  };
  const _backClick = () => {
    setOpenCountryList(false);
    setOpenCategoryList(false);
  };
  const _changeCategory = (category) => {
    props.close()
    navigate("/route=search?categoryid=" + category.code);
  };
  const _changeCountry = (country) => {
    props.close()
    navigate("/route=search?country=" + country.name);
  };

  return (
    <div style={{ width: `${width}px`,height: `50vh` }}>
      {!loading ? (
        <div>
          {!openCategoryList && !openCountryList && (
            <div>
              <div
                style={{
                  display:"flex" ,
                  justifyContent:"flex-end",
                  flexDirection:"row",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                  padding: "0.6rem",
                  alignItems:"flex-end"
                }}
              >
                <Close onClick={()=> props.close()} color="disabled" />
              </div>
              <div
                style={{ listStyle: "none" }}
                onClick={() => _openCategory()}
              >
                <a>CATEGORIES</a>
              </div>
              <div style={{ listStyle: "none" }} onClick={() => _openCountry()}>
                <a>COUNTRIES</a>
              </div>
              <div style={{ listStyle: "none" }}  
              onClick={() => {
                props.close();
                navigate("/route=search?filter=weboffers");
                }}>
                <a>OFFERS</a>
              </div>
            </div>
          )}
          {openCategoryList && (
            <div>
              <div
                style={{
                  display:"flex" ,
                  flex:1,
                  justifyContent:"space-between",
                  alignItems:'center',
                  flexDirection:"row",
                  color:'#a8a7a7',
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                  padding: "0.6rem",
                }}
              >
                <ArrowBack onClick={_backClick} color="disabled" />
                <p>CATEGORIES</p>
                <Close onClick={()=> props.close()} color="disabled" />
              </div>
              
              {props.categories
                .filter((cat) => cat.indentation === "ItemCategory")
                .map((cat) => {
                  return (
                    <div
                      style={{ listStyle: "none" }}
                      onClick={() => _changeCategory(cat)}
                      key={cat.code}
                    >
                      <a>{cat.description}</a>
                    </div>
                  );
                })}
            </div>
          )}
          {openCountryList && (
            <div>
              <div
                style={{
                  display:"flex" ,
                  flex:1,
                  justifyContent:"space-between",
                  alignItems:'center',
                  flexDirection:"row",
                  color:'#a8a7a7',
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                  padding: "0.6rem",
                }}
              >
                <ArrowBack onClick={_backClick} color="disabled" />
                <p>COUNTRIES</p>
                <Close onClick={()=> props.close()} color="disabled" />
              </div>
              {props.countryList.map((reg) => {
                return (
                  <div
                    style={{ listStyle: "none" }}
                    onClick={() => _changeCountry(reg)}
                    key={reg.code}
                  >
                    <a>{reg.name}</a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      getCountryList: bindActionCreators(
        countryActions.getCountryList,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    categories: state.categoryListReducer,
    countryList: state.countryReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenuBarContent);
