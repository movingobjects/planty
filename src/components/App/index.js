
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { map } from 'lodash';

import { sortByDateLastWatered } from '~/src/utils';

import style from './index.module.scss';

import LoginView from './LoginView';
import SpeciesList from './SpeciesList';
import PlantsList from './PlantsList';

const App = () => {

  const [ authReady, setAuthReady ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ species, setSpecies ] = useState([]);
  const [ plants, setPlants ] = useState([]);

  useEffect(() => {

    firebase.auth()
      .onAuthStateChanged((user) => {

        if (user) {
          onUserLogin(user);
        }

        setUser(user);
        setAuthReady(true);

      });

  }, [])

  function onLoginClick() {

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithRedirect(provider);

  }
  function onUserLogin(user) {

    const userId = user?.uid;

    firebase.database()
      .ref(`users/${userId}/profile`)
      .update({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        dateLastLogin: (new Date()).toISOString()
      });

    firebase.database()
      .ref(`species`)
      .on('value', (data) => onSpeciesDataUpdate(data.val()));

    firebase.database()
      .ref(`users/${userId}/plants`)
      .on('value', (data) => onPlantsDataUpdate(data.val()));

  }

  function onSpeciesDataUpdate(data) {
    // Maps object to array
    setSpecies(map(data, (s, id) => ({ ...s, id })));
  }
  function onPlantsDataUpdate(data) {
    // Maps object to array

    const updatedPlants = map(data, (p, id) => ({ ...p, id }))
      .sort(sortByDateLastWatered);

    setPlants(updatedPlants);
  }

  return (
    <div className={style.wrap}>
      <h1>Plants Watering Log</h1>

      {user ? (
        <main>
          {/* <SpeciesList species={species} /> */}
          <PlantsList
            userId={user?.uid}
            plants={plants}
            species={species} />
        </main>
      ) : (
        <LoginView
          ready={authReady}
          onLoginClick={onLoginClick} />
      )}

    </div>
  )

}

export default App;
