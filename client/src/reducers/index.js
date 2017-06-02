import { combineReducers } from 'redux';
import auth from './auth';
import flash from './flash';
import serviceCategories from './serviceCategories';
import partCategories from './partCategories';

const rootReducer = combineReducers({
  auth,
  flash,
  serviceCategories,
  partCategories,
});

export default rootReducer;
