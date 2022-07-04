import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";

function MenuBarCategoriesContent(props) {
  const navigate = useNavigate()
  useEffect(() => {
    props.actions.getCategories();
  }, []);
  const _changeCategory=(category)=>{
    navigate('/route=search?categoryid='+category.code)
  }

  return (
    <div>
        {props.categories.filter(cat=>cat.indentation==="ItemCategory").map((cat) => {
          return (
            <div style={{listStyle:"none"}} onClick={()=>_changeCategory(cat)} key={cat.code}>
              <a>{cat.description}</a>
            </div>
          );
        })}
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
    },
  };
}

function mapStateToProps(state) {
  return {
    categories: state.categoryListReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBarCategoriesContent) ;
