import { combineReducers } from 'redux';
import counterReducer from './testing';
import profileStatusReducer from './profile_status_reducer'; 
import {reducer as formReducer} from 'redux-form'
import userProfile from './user_profile_reducer';
import storeProduct from './store_product_reducer';
import cartProduct from './cart_product_reducer';
import serverDrugList from './server_drug_list_reducer';
import testDrop from './testing_drop';

const rootReducer = combineReducers({
  counter:counterReducer,
  profileStatusReducer:profileStatusReducer,
  userProfile,
  storeProduct,
  cartProduct,
  serverDrugList,
  testDrop,
  form:formReducer
});

export default rootReducer;
