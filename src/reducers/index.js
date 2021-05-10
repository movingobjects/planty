
import { combineReducers } from 'redux';

import * as reduceApp from './app';

const rootReducer = combineReducers({
  ...reduceApp
});

export default rootReducer;
