
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

import store from './store';

import App from './components/App';
import Router from './components/Router';

import './styles/reset.scss';

if (!process.env.FIREBASE_API_KEY?.length) {
  throw new Error('No Firebase API key specified in .env file');
}

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "planty-log.firebaseapp.com",
    databaseURL: "https://planty-log-default-rtdb.firebaseio.com",
    projectId: "planty-log",
    storageBucket: "planty-log.appspot.com",
    messagingSenderId: "942477270311",
    appId: "1:942477270311:web:2ef6d54d080367208a1d02"
  });
}else {
  firebase.app();
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
