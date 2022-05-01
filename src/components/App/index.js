import React, {
  useState,
  useEffect,
  useCallback,
  createContext
} from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, Storage } from 'aws-amplify';
import {
  listSpecies,
  listPlants,
  getUser
} from 'graphql/queries';
import { createUser } from 'graphql/mutations';

// import '@aws-amplify/ui-react/styles.css';

import style from './index.module.scss';

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

  const fetchPlants = useCallback(async () => {

    const apiData = await API.graphql({
      query: listPlants,
      variables: {
        filter: {
          userId: {
            eq: user?.id
          }
        }
      }
    });
    const plantsFromAPI = apiData.data.listPlants.items;

    await Promise.all(plantsFromAPI.map(async plant => {
      if (plant.image) {
        const image = await Storage.get(plant.image);
        plant.image = image;
      }
      return plant;
    }))

    const items = apiData.data.listPlants.items
      .sort((a, b) => a.name.localeCompare(b.name));

    setPlants(items);

  }, [ user ]);

  const fetchSpecies = useCallback(async () => {

    const apiData = await API.graphql({
      query: listSpecies
    });

    const items = apiData.data.listSpecies.items
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    setSpecies(items);

  }, [ ]);

  useEffect(() => {

    async function fetchUser() {

      const {
        username: userId,
        attributes: {
          email
        }
      } = authUser;

      const apiData = await API.graphql({
        query: getUser,
        variables: {
          id: userId
        }
      });
      const savedUser = apiData.data.getUser;

      if (savedUser) {
        setUser(savedUser);

      } else {
        await API.graphql({
          query: createUser,
          variables: {
            input: {
              id: userId,
              firstName: email.split('@')[0],
              email: email
            }
          }
        });
        fetchUser();

      }

    }

    if (authUser) {
      fetchUser();
    }

  }, [ authUser ]);

  useEffect(() => {
    if (user) {
      fetchPlants();
      fetchSpecies();
    }
  }, [
    user,
    fetchPlants,
    fetchSpecies
  ])

  function onSpeciesChange(nextSpecies) {
    fetchSpecies();
  }
  function onPlantsChange(nextPlants) {
    fetchPlants();
  }
  return (
    <AppContext.Provider value={{
      user,
      plants,
      species
    }}>
      <div className={style.wrap}>
        <h2>Hello {user?.firstName}</h2>
        <button onClick={signOut}>Sign out</button>
        <hr />
        <SpeciesView
          onChange={onSpeciesChange} />
        <hr />
        <PlantsView
          onChange={onPlantsChange} />
      </div>
    </AppContext.Provider>
  );

}

export default withAuthenticator(App);
