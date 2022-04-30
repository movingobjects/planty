import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listPlants } from 'graphql/queries';
import {
  createPlant as createPlantMutation,
  deletePlant as deletePlantMutation
} from 'graphql/mutations';

import style from './index.module.scss';

const emptyFormState = {
  name: ''
}

function PlantsView() {

  const [ plants, setPlants ] = useState([]);
  const [ formData, setFormData ] = useState(emptyFormState);

  const canAdd = (
    !!formData?.name?.length
  )

  useEffect(() => {
    fetchPlants();
  }, []);

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

  async function addPlant() {
    if (!canAdd) return;
    await API.graphql({
      query: createPlantMutation,
      variables: {
        input: formData
      }
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setPlants([
      ...plants,
      formData
    ]);
    setFormData(emptyFormState);
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

  async function onFileSelect(e) {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFormData({
      ...formData,
      image: file.name
    });
    await Storage.put(file.name, file);
    fetchPlants();
  }

  return (
    <div className={style.wrap}>

      <h2>Plants</h2>

      <div>
        <h3>Add plant</h3>

        <input
          onChange={(e) => {
            setFormData({
              ...formData,
              'name': e.target.value
            })
          }}
          placeholder="Plant name"
          value={formData.name} />

        <input
          type="file"
          onChange={onFileSelect} />

        <button
          disabled={!canAdd}
          onClick={addPlant}>
          Add Plant
        </button>

      </div>

      <div>
        <h3>Plants</h3>
        <ul>
          {plants.map(plant => (
            <li key={plant.id || plant.name}>
              {!!plant.image && (
                <p>
                  <img
                    alt={plant.name}
                    src={plant.image}
                    style={{
                      width: 200
                    }} />
                </p>
              )}
              <p>
                {plant.name} ({plant.specie.commonName})
              </p>
              <p>
                <button onClick={() => deletePlant(plant)}>
                  &times;
                </button>
              </p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default PlantsView;
