import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import style from './index.module.scss';

import PlantsView from './PlantsView';

function App() {

  return (
    <div className={style.wrap}>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <h1>Hello {user?.attributes?.email}</h1>
            <PlantsView />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </div>
  );

}

export default App;
