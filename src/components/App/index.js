import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

import style from './index.module.scss';

import PlantsView from './PlantsView';
import SpeciesView from './SpeciesView';

function App() {

  return (
    <div className={style.wrap}>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <h2>Hello {user?.attributes?.email}</h2>
            <button onClick={signOut}>Sign out</button>
            <hr />
            <SpeciesView />
            <hr />
            <PlantsView />
          </>
        )}
      </Authenticator>
    </div>
  );

}

export default App;
