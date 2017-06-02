import { combineReducers } from 'redux';
import auth from './auth';
import flash from './flash';
import serviceCategories from './serviceCategories';
import partCategories from './partCategories';
import services from './services';

const rootReducer = combineReducers({
  auth,
  flash,
  serviceCategories,
  partCategories,
  services,
});

export default rootReducer;
