import { combineReducers } from "redux";
import categoryListReducer from "./categoryReducers/categoryListReducer";
import productListReducer from "./productReducers/productListReducer";
import changeSearchReducer from "./productReducers/changeSearchReducer";
import cartActionReducer from "./cartReducers/cartActionReducer";
import allProductListReducer from "./productReducers/allProductListReducer";
import productCountReducer from "./productReducers/productCountReducer";
import settingReducer from "./settingsReducers/settingReducer";
import manufacturerReducer from "./manufacturerReducers/manufacturerReducer";
import countryReducer from "./countryReducers/countryReducer";
import {
  currentUserReducer,
  currentUserErrorReducer,
} from "./userReducers/currentUserReducer";
const rootReducer = combineReducers({
  categoryListReducer,
  productListReducer,
  changeSearchReducer,
  cartActionReducer,
  allProductListReducer,
  currentUserReducer,
  currentUserErrorReducer,
  productCountReducer,
  settingReducer,
  manufacturerReducer,
  countryReducer
});
export default rootReducer;
