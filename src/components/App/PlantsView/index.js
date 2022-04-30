import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listPlants } from 'graphql/queries';
import {
  createPlant as createPlantMutation,
  deletePlant as deletePlantMutation
} from 'graphql/mutations';

import style from './index.module.scss';

const initialFormState = {
  name: ''
};

function PlantsView() {

  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    const apiData = await API.graphql({ query: listPlants });
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

  async function createPlant() {
    if (!formData.name) return;
    await API.graphql({ query: createPlantMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setPlants([ ...plants, formData ]);
    setFormData(initialFormState);
  }

  async function deletePlant({ id }) {
    const newPlantsArray = plants.filter(plant => plant.id !== id);
    setPlants(newPlantsArray);
    await API.graphql({
      query: deletePlantMutation,
      variables: {
        input: { id }
      }
    });
  }
  async function onFileChange(e) {
    console.log(e.target.files);
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchPlants();
  }


  return (
    <div className={style.wrap}>
      <h1>Planty</h1>
      <fieldset>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Plant name"
          value={formData.name}
        />
        <input
          type="file"
          onChange={onFileChange}
        />
        <button onClick={createPlant}>Create Plant</button>
      </fieldset>
      <div>
        {plants.map(plant => (
          <div key={plant.id || plant.name}>
            <h2>{plant.name}</h2>
            {plant.image && (
              <img
                alt={plant.name}
                src={plant.image}
                style={{
                  width: 400
                }} />
            )}
            <button onClick={() => deletePlant(plant)}>Delete plant</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantsView;
