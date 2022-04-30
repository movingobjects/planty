import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listPlants } from 'graphql/queries';
import {
  createPlant as createPlantMutation,
  deletePlant as deletePlantMutation
} from 'graphql/mutations';

import AddPlantModal from './AddPlantModal';

import style from './index.module.scss';

function PlantsView() {

  const [ plants, setPlants ] = useState([]);
  const [ addModalOn, setAddModalOn ] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  function onAddClick() {
    setAddModalOn(true);
  }
  function onCancelAddModal() {
    setAddModalOn(false);
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
    setPlants(apiData.data.listPlants.items);
  }

  async function addPlant(formData) {

    if (formData.image) {
      const filename = formData.image.name;
      await Storage.put(filename, formData.image);
      formData.image = filename;
    }

    await API.graphql({
      query: createPlantMutation,
      variables: {
        input: formData
      }
    });

    if (formData.image) {
      formData.image = await Storage.get(formData.image);
    }

    setPlants([
      ...plants,
      formData
    ]);

  }

  async function deletePlant({ id }) {
    const nextPlants = plants.filter(plant => plant.id !== id);
    setPlants(nextPlants);
    await API.graphql({
      query: deletePlantMutation,
      variables: {
        input: {
          id
        }
      }
    });
  }

  return (
    <div className={style.wrap}>

      {addModalOn && (
        <AddPlantModal
          onAdd={addPlant}
          onCancel={onCancelAddModal} />
      )}

      <h2>Plants</h2>

      <button
        onClick={onAddClick}>
        Add Plant
      </button>

      <ul>
        {plants.map(plant => (
          <li
            key={plant.id || plant.name}>
            <button
              onClick={() => deletePlant(plant)}>
              &times;
            </button>
            &nbsp;
            {!!plant.image && (
              <img
                alt={plant.name}
                src={plant.image}
                style={{
                  width: 50
                }} />
            )}
            {plant.name} ({plant.specie.commonName}) [{plant.id}]
          </li>
        ))}
      </ul>

    </div>
  );

}

export default PlantsView;
