
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import store from './store';

import App from './components/App';
import Router from './components/Router';

import './styles/reset.scss';

if (!process.env.FIREBASE_API_KEY?.length) {
  throw new Error('No Firebase API key specified in .env file');
}

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "plant-watering-log.firebaseapp.com",
  projectId: "plant-watering-log",
  storageBucket: "plant-watering-log.appspot.com",
  messagingSenderId: "377290883858",
  appId: "1:377290883858:web:ddb02432d872fd42ea69cb",
  measurementId: "G-042XR8R9GE"
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
