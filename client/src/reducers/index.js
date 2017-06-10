import { combineReducers } from 'redux';
import auth from './auth';
import flash from './flash';
import serviceCategories from './serviceCategories';
import partCategories from './partCategories';
import services from './services';
import parts from './parts';
import part from './part';
import search from './search';
import query from './query';

const rootReducer = combineReducers({
  auth,
  flash,
  serviceCategories,
  partCategories,
  services,
  parts,
  part,
  search,
  query,
});

export default rootReducer;
