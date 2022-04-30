import React from 'react';
import ReactDOM from 'react-dom/client';
import Amplify from 'aws-amplify';

import App from 'components/App';
import config from './aws-exports';

import 'styles/reset.scss';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
