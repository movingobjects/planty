
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '@firebase/app';
import { map } from 'lodash';
import moment from 'moment';

import { sortByDateNextWater } from '~/src/utils';

import Switch from '~/src/components/Router/Switch';
import Route from '~/src/components/Router/Route';
import Sidebar from './Sidebar';
import LoginView from './LoginView';
import EditView from './EditView';
import TimelineView from './TimelineView';
import TodayView from './TodayView';
import AddPlantModal from './modals/AddPlantModal';
import AddSpecieModal from './modals/AddSpecieModal';
import EditPlantModal from './modals/EditPlantModal';
import EditSpecieModal from './modals/EditSpecieModal';

import * as style from './index.module.scss';

const App = () => {

  const route = useSelector((state) => state.route);
  const species = useSelector((state) => state.species);
  const plants = useSelector((state) => state.plants);

  const dispatch = useDispatch();

  const [ authReady, setAuthReady ] = useState(false);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    initFirebase();
    initMoment();
  }, [ ])

  function initFirebase() {

    firebase.auth()
      .onAuthStateChanged((user) => {

        if (user) {
          onUserLogin(user);
        }

        setUser(user);
        setAuthReady(true);

      });

  }

  function initMoment() {

    moment.updateLocale('en', {
      calendar : {
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[Last] dddd',
        nextWeek : '[Next] dddd',
        sameElse : 'MMMM D'
      }
    });

  }

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

  function signOut() {

    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');
    }).catch((error) => {
      console.log('An error happened.');
    });

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

      <aside>
        <Sidebar />
      </aside>

      <main>

        <Switch>
          <Route path='#/edit' component={EditView} />
          <Route path='#/timeline' component={TimelineView} />
          <Route path='#/' component={TodayView} />
        </Switch>

        <Switch>
          <Route path='#/edit/new/plant' component={AddPlantModal} />
          <Route path='#/edit/new/plant' component={AddSpecieModal} />
          <Route path='#/edit/plant/:plantId' component={EditPlantModal} />
          <Route path='#/edit/specie/:specieId' component={EditSpecieModal} />
        </Switch>

      </main>

    </div>
  )

}

export default App;
