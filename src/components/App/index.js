import React, {
  useState,
  useEffect,
  createContext
} from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { API, Storage } from 'aws-amplify';
import {
  listSpecies,
  listPlants
} from 'graphql/queries';
// import '@aws-amplify/ui-react/styles.css';

import style from './index.module.scss';

import PlantsView from './PlantsView';
import SpeciesView from './SpeciesView';

export const AppContext = createContext();

export default function App() {

  const [ species, setSpecies ] = useState([]);
  const [ plants, setPlants ] = useState([]);

  useEffect(() => {
    fetchSpecies();
    fetchPlants();
  }, []);

  function onSpeciesChange(nextSpecies) {
    fetchSpecies();
  }
  function onPlantsChange(nextPlants) {
    fetchPlants();
  }

  async function fetchPlants() {
    const apiData = await API.graphql({
      query: listPlants
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

  }
  async function fetchSpecies() {

    const apiData = await API.graphql({
      query: listSpecies
    });

    const items = apiData.data.listSpecies.items
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    setSpecies(items);

  }

  return (
    <div className={style.wrap}>
      <Authenticator>
        {({ signOut, user }) => (
          <AppContext.Provider value={{
            user,
            plants,
            species
          }}>
            <h2>Hello {user?.attributes?.email}</h2>
            <button onClick={signOut}>Sign out</button>
            <hr />
            <SpeciesView
              onChange={onSpeciesChange} />
            <hr />
            <PlantsView
              onChange={onPlantsChange} />
          </AppContext.Provider>
        )}
      </Authenticator>
    </div>
  );

}
