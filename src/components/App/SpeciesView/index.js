import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listSpecies } from 'graphql/queries';
import {
  createSpecie as createSpecieMutation,
  deleteSpecie as deleteSpecieMutation
} from 'graphql/mutations';

import AddSpecieModal from './AddSpecieModal';

import style from './index.module.scss';

function SpeciesView() {

  const [ species, setSpecies ] = useState([]);
  const [ addModalOn, setAddModalOn ] = useState(false);

  useEffect(() => {
    fetchSpecies();
  }, []);

  function onAddClick() {
    setAddModalOn(true);
  }
  function onCancelAddModal() {
    setAddModalOn(false);
  }

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
  async function addSpecie(formData) {

    await API.graphql({
      query: createSpecieMutation,
      variables: {
        input: formData
      }
    });

    setSpecies([
      ...species,
      formData
    ]);

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

  return (
    <div className={style.wrap}>

      {addModalOn && (
        <AddSpecieModal
          onAdd={addSpecie}
          onCancel={onCancelAddModal} />
      )}

      <h2>Species</h2>

      <button
        onClick={onAddClick}>
        Add Specie
      </button>

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
  );
}

export default SpeciesView;
