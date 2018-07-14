import { combineReducers } from 'redux';
import { currentShopReducer, changeEmptyUserReducer, changeEmptyPasswordReducer } from './login.js';


var rootReducer = combineReducers({
  currentShopReducer,
  changeEmptyUserReducer,
  changeEmptyPasswordReducer
})

export default rootReducer;