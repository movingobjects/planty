
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { map } from 'lodash';

import * as actions from '~/src/actions';
import { sortByDateLastWatered } from '~/src/utils';

import Switch from '~/src/components/Router/Switch';
import Route from '~/src/components/Router/Route';
import Header from './Header';
import LoginView from './LoginView';
import SpeciesList from './SpeciesList';
import PlantsList from './PlantsList';
import EditPlantModal from './modals/EditPlantModal';

import style from './index.module.scss';


const App = () => {

  const route = useSelector((state) => state.route);

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

  if (route === null) {
    return null;
  }

  if (!user) {
    return (
      <LoginView
        ready={authReady}
        onLoginClick={onLoginClick} />
    )
  }

  return (
    <div className={style.wrap}>

      <Header />

      <main>

        <Switch>

          <Route
            path='#/species'
            component={SpeciesList}
            userId={user?.uid}
            species={species} />

          <Route
            path='#/'
            component={PlantsList}
            userId={user?.uid}
            plants={plants}
            species={species} />

        </Switch>

        <Switch>
          <Route path='#/plant/:plantId/edit' component={EditPlantModal} />
        </Switch>

      </main>

    </div>
  )

}

export default App;
