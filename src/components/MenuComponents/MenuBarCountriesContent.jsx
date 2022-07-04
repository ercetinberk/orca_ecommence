import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as countryActions from "../../redux/actions/countryActions";

function MenuBarCountriesContent(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCountries = async () => {
      await props.actions.getCountryList()
      setLoading(false)
    };
    getCountries();
  }, []);

  const _changeCountry = (country) => {
    navigate("/route=search?country=" + country.name);
  };

  return (
    <div>
      {!loading ? (
        <div>
          {props.countryList
            .map((reg) => {
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
      ) : (
        <div />
      )}
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCountryList: bindActionCreators(
        countryActions.getCountryList,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    countryList: state.countryReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBarCountriesContent);
