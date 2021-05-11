
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

var firebaseConfig = {
};

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "plants-friend.firebaseapp.com",
  databaseURL: "https://plants-friend-default-rtdb.firebaseio.com",
  projectId: "plants-friend",
  storageBucket: "plants-friend.appspot.com",
  messagingSenderId: "644284774864",
  appId: "1:644284774864:web:26b4b92efb41958bb5e1d5",
  measurementId: "G-CT8X00DKDX"
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
