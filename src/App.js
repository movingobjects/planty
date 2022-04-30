import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

import './App.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.attributes.email}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
