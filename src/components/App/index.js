import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, Storage } from 'aws-amplify';
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import * as atoms from 'atoms';
import * as subscriptions from 'graphql/subscriptions';
import useApi from 'hooks/useApi';

import '@aws-amplify/ui-react/styles.css';

import EditProfileView from './EditProfileView';
import Header from './Header';
import PlantsView from './PlantsView';
import RoomsView from './RoomsView';
import SpeciesView from './SpeciesView';
import TimelineView from './TimelineView';

import style from './index.module.scss';

const App = ({
  signOut,
  user: authUser
}) => {
  const setAuthUser = useSetAtom(atoms.authUser);
  const [user, setUser] = useAtom(atoms.user);
  const setPlants = useSetAtom(atoms.plants);
  const setSpecies = useSetAtom(atoms.species);
  const setRooms = useSetAtom(atoms.rooms);

  const {
    fetchUser,
    fetchSpecies,
    fetchRooms,
    fetchPlants
  } = useApi();

  useEffect(() => {
    if (authUser) {
      setAuthUser(authUser);
      fetchUser().then((user) => setUser(user));
    }
  }, [
    setAuthUser,
    fetchUser,
    authUser,
    setUser
  ]);

  useEffect(() => {
    if (user) {
      fetchSpecies().then((result) => setSpecies(result));
      fetchRooms().then((result) => setRooms(result));
      fetchPlants().then((result) => setPlants(result));
    }
  }, [
    user,
    setSpecies,
    setRooms,
    setPlants,
    fetchSpecies,
    fetchRooms,
    fetchPlants
  ]);

  useEffect(() => {
    const userSub = API.graphql({
      query: subscriptions.onUserChange,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }).subscribe({
      next: async ({
        provider,
        value
      }) => {
        const apiUser = value.data.onUserChange;

        if (apiUser.profileImg?.length) {
          apiUser.profileImg = await Storage.get(apiUser.profileImg);
        }

        setUser(apiUser);
      },
      // eslint-disable-next-line no-console
      error: (error) => console.warn(error)
    });

    return () => {
      userSub.unsubscribe();
    };
  }, [
    setUser
  ]);

  return (
    <div className={style.wrap}>

      <Header
        onSignOut={signOut} />

      <Routes>
        <Route path="/" element={<Navigate to="/plants" replace={true} />} />
        <Route path="/plants/*" element={<PlantsView />} />
        <Route path="/timeline/*" element={<TimelineView />} />
        <Route path="/species/*" element={<SpeciesView />} />
        <Route path="/rooms/*" element={<RoomsView />} />
        <Route path="/edit-profile" element={<EditProfileView />} />
      </Routes>

    </div>
  );
};

export default withAuthenticator(App);