
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/reset.scss';
import App from 'components/App';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
