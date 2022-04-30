import React from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import PlantsView from './PlantsView';

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <PlantsView />
        )}
      </Authenticator>
    </div>
  );
}

export default App;
