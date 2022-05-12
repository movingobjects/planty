import React, {
  useState,
  useEffect,
  createContext
} from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import {
  useFetchUser,
  useFetchSpecies,
  useFetchRooms,
  useFetchPlants
} from 'hooks/fetch';
import { API } from 'aws-amplify';
import * as subscriptions from 'graphql/subscriptions';

// import '@aws-amplify/ui-react/styles.css';

import EditProfileView from './EditProfileView';
import Header from './Header';
import PlantsView from './PlantsView';
import SpeciesView from './SpeciesView';
import RoomsView from './RoomsView';

import style from './index.module.scss';

export const AppContext = createContext();

function App({
  signOut,
  user: authUser
}) {

  const [ user, setUser ] = useState(null);
  const [ species, setSpecies ] = useState([]);
  const [ rooms, setRooms ] = useState([]);
  const [ plants, setPlants ] = useState([]);

  const fetchUser    = useFetchUser(authUser),
        fetchSpecies = useFetchSpecies(),
        fetchRooms   = useFetchRooms(),
        fetchPlants  = useFetchPlants(user);

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
      fetchSpecies().then((result) => setSpecies(result));
      fetchRooms().then((result) => setRooms(result));
      fetchPlants().then((result) => setPlants(result));
    }
  }, [
    user,
    fetchSpecies,
    fetchRooms,
    fetchPlants
  ])

  useEffect(() => {

    const userSub = API.graphql({
      query: subscriptions.onUserChange,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }).subscribe({
        next: async ({ provider, value }) => {

          const apiUser = value.data.onUserChange;

          if (!!apiUser.profileImg?.length) {
            apiUser.profileImg = await Storage.get(apiUser.profileImg);
          }

          setUser(apiUser);

        },
        error: (error) => console.warn(error)
    });

    return () => {
      userSub.unsubscribe();
    };

  }, [ ]);

  function onUserChange() {
    fetchUser().then((user) => setUser(user));
  }
  function onSpeciesChange() {
    fetchSpecies().then((result) => setSpecies(result));
    fetchPlants().then((result) => setPlants(result));
  }
  function onRoomsChange() {
    fetchRooms().then((result) => setRooms(result));
    fetchPlants().then((result) => setPlants(result));
  }
  function onPlantsChange() {
    fetchPlants().then((result) => setPlants(result));
  }

  return (
    <AppContext.Provider value={{
      user,
      plants,
      species,
      rooms,
      onUserChange,
      onSpeciesChange,
      onRoomsChange,
      onPlantsChange
    }}>
      <div className={style.wrap}>

        <Header
          onSignOut={signOut} />

        <Routes>
          <Route path='/' element={<Navigate to='/plants' replace />} />
          <Route path='/plants/*' element={<PlantsView />} />
          <Route path='/species/*' element={<SpeciesView />} />
          <Route path='/rooms/*' element={<RoomsView />} />
          <Route path='/edit-profile' element={<EditProfileView />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );

}

export default withAuthenticator(App);
