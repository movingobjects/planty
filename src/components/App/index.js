import React, {
  useState,
  useEffect,
  createContext
} from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  useFetchUser,
  useFetchPlants,
  useFetchSpecies
} from 'hooks/fetch';
import { API } from 'aws-amplify';
import * as subscriptions from 'graphql/subscriptions';

// import '@aws-amplify/ui-react/styles.css';

import style from './index.module.scss';

import Header from './Header';
import PlantsView from './PlantsView';
import SpeciesView from './SpeciesView';

export const AppContext = createContext();

function App({
  signOut,
  user: authUser
}) {

  const [ user, setUser ] = useState(null);
  const [ species, setSpecies ] = useState([]);
  const [ plants, setPlants ] = useState([]);

  const fetchUser    = useFetchUser(authUser),
        fetchPlants  = useFetchPlants(user),
        fetchSpecies = useFetchSpecies();

  useEffect(() => {
    if (authUser) {
      fetchUser().then((user) => setUser(user));
    }
  }, [
    authUser,
    fetchUser
  ]);

  useEffect(() => {
    if (user) {
      fetchPlants().then((result) => setPlants(result));
      fetchSpecies().then((result) => setSpecies(result));
    }
  }, [
    user,
    fetchPlants,
    fetchSpecies
  ])

  useEffect(() => {

    const userSub = API.graphql({
      query: subscriptions.onUserChange
    }).subscribe({
        next: ({ provider, value }) => {
          setUser(value.data.onUserChange)
        },
        error: (error) => console.warn(error)
    });

    return () => {
      userSub.unsubscribe();
    };

  }, [ ]);

  function onSpeciesChange() {
    fetchSpecies().then((result) => setSpecies(result));
  }
  function onPlantsChange() {
    fetchPlants().then((result) => setPlants(result));
  }

  return (
    <AppContext.Provider value={{
      user,
      plants,
      species
    }}>
      <div className={style.wrap}>

        <Header
          onSignOut={signOut} />

        <SpeciesView
          onChange={onSpeciesChange} />

        <PlantsView
          onChange={onPlantsChange} />

      </div>
    </AppContext.Provider>
  );

}

export default withAuthenticator(App);
