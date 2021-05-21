
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import { map } from 'lodash';

import { sortByDateNextWater } from '~/src/utils';

import Switch from '~/src/components/Router/Switch';
import Route from '~/src/components/Router/Route';
import Header from './Header';
import LoginView from './LoginView';
import SpeciesList from './SpeciesList';
import PlantsView from './PlantsView';
import AddPlantModal from './modals/AddPlantModal';
import EditPlantModal from './modals/EditPlantModal';

import style from './index.module.scss';


const App = () => {

  const route = useSelector((state) => state.route);
  const species = useSelector((state) => state.species);
  const plants = useSelector((state) => state.plants);

  const dispatch = useDispatch();

  const [ authReady, setAuthReady ] = useState(false);
  const [ user, setUser ] = useState(null);

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

    dispatch({
      type: 'setUserId',
      userId
    });

    firebase.database()
      .ref(`users/${userId}/profile`)
      .update({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        dateLastLogin: (new Date()).toISOString()
      });

    firebase.database()
      .ref('species')
      .on('value', onSpeciesDataUpdate);

    firebase.database()
      .ref(`users/${userId}/plants`)
      .on('value', onPlantsDataUpdate);

  }

  function onSpeciesDataUpdate(data) {

    // Maps object to array
    const nextSpecies = map(data.val(), (s, id) => ({ ...s, id }));

    dispatch({
      type: 'setSpecies',
      species: nextSpecies
    });

  }
  function onPlantsDataUpdate(data) {

    // Maps object to array
    const nextPlants = map(data.val(), (p, id) => ({ ...p, id }))
      .sort(sortByDateNextWater);

    dispatch({
      type: 'setPlants',
      plants: nextPlants
    });

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
          <Route path='#/species' component={SpeciesList} />
          <Route path='#/' component={PlantsView} />
        </Switch>

        <Switch>
          <Route path='#/add' component={AddPlantModal} />
          <Route path='#/plant/:plantId/edit' component={EditPlantModal} />
        </Switch>

      </main>

    </div>
  )

}

export default App;
