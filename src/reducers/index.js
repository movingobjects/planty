
import { combineReducers } from 'redux';

import * as reduceApp from './app';
import * as reducePlants from './plants';

const rootReducer = combineReducers({
  ...reduceApp,
  ...reducePlants
});

export default rootReducer;
