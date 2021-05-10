
import { createStore, applyMiddleware, compose } from 'redux';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import { createLogger } from 'redux-logger'

import rootReducer from './reducers';
import config from '~/src/config';

const isDevMode        = process.env.NODE_ENV === `development`,
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  batchDispatchMiddleware
];

if (isDevMode && config?.debug?.enableReduxLogger) {
  middlewares.push(createLogger({
    collapsed: true
  }));
}

const store = createStore(
  rootReducer,
  { },
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
