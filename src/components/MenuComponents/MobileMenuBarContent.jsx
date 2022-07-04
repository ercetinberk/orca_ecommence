import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as countryActions from "../../redux/actions/countryActions";
import { ArrowBack } from "@material-ui/icons";
import { colors } from "../../res/values/values";
function MobileMenuBarContent(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [openCountryList, setOpenCountryList] = useState(false);
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
    navigate("/route=search?categoryid=" + category.code);
  };
  const _changeCountry = (country) => {
    navigate("/route=search?country=" + country.name);
  };

  return (
    <div style={{ width: "60vw" }}>
      {!loading ? (
        <div>
          {!openCategoryList && !openCountryList && (
            <div>
              <div
                style={{ listStyle: "none" }}
                onClick={() => _openCategory()}
              >
                <a>CATEGORIES</a>
              </div>
              <div style={{ listStyle: "none" }} onClick={() => _openCountry()}>
                <a>COUNTRIES</a>
              </div>
            </div>
          )}
          {openCategoryList && (
            <div>
              <div
                onClick={_backClick}
                style={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid red",
                  padding: "5px",
                }}
              >
                <ArrowBack color="secondary" />
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
                onClick={_backClick}
                style={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid red",
                  padding: "5px",
                }}
              >
                <ArrowBack color="secondary" />
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
