import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listSpecies } from 'graphql/queries';
import {
  createSpecie as createSpecieMutation,
  deleteSpecie as deleteSpecieMutation
} from 'graphql/mutations';

import style from './index.module.scss';

const emptyFormState = {
  commonName: '',
  scientificName: ''
}

function SpeciesView() {

  const [ species, setSpecies ] = useState([]);
  const [ formData, setFormData ] = useState(emptyFormState);

  const canAdd = (
    !!formData?.commonName?.length &&
    !!formData?.scientificName?.length
  );

  useEffect(() => {
    fetchSpecies();
  }, []);

  async function fetchSpecies() {
    const apiData = await API.graphql({
      query: listSpecies
    });
    const speciesFromAPI = apiData.data.listSpecies.items;
    await Promise.all(speciesFromAPI.map(async specie => {
      if (specie.image) {
        const image = await Storage.get(specie.image);
        specie.image = image;
      }
      return specie;
    }))
    setSpecies(apiData.data.listSpecies.items);
  }
  async function addSpecie() {
    if (!canAdd) return;
    await API.graphql({
      query: createSpecieMutation,
      variables: {
        input: formData
      }
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setSpecies([
      ...species,
      formData
    ]);
    setFormData(emptyFormState);
  }
  async function deleteSpecie({ id }) {
    const nextSpecies = species.filter(specie => specie.id !== id);
    setSpecies(nextSpecies);
    await API.graphql({
      query: deleteSpecieMutation,
      variables: {
        input: {
          id
        }
      }
    });
  }

  function onInputChange(e) {

    const field = e?.target?.name,
          value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });

  }

  return (
    <div className={style.wrap}>

      <h2>Species</h2>

      <div>
        <h3>Add specie</h3>

        <input
          name='commonName'
          placeholder='Common name'
          value={formData.commonName}
          onChange={onInputChange} />

        <input
          name='scientificName'
          placeholder='Scientific Name'
          value={formData.scientificName}
          onChange={onInputChange} />

        <button
          disabled={!canAdd}
          onClick={addSpecie}>
          Add Specie
        </button>
      </div>

      <div>
        <h3>Species</h3>
        <ul>
          {species.map((specie) => (
            <li key={specie.id || specie.scientificName}>
              ({specie.id})
              {specie.commonName} ({specie.scientificName})
              <button
                onClick={() => deleteSpecie(specie)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default SpeciesView;
