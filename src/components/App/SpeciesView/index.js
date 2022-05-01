import React, { useState, useContext } from 'react';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';

import { AppContext } from 'components/App';
import AddSpecieModal from './AddSpecieModal';

import style from './index.module.scss';

export default function SpeciesView({
  onChange = () => { }
}) {

  const { species } = useContext(AppContext);
  const [ addModalOn, setAddModalOn ] = useState(false);

  async function onAdd(specieData) {

    await API.graphql({
      query: mutations.createSpecie,
      variables: {
        input: specieData
      }
    });

    onChange();

  }
  async function onDelete({ id }) {

    await API.graphql({
      query: mutations.deleteSpecie,
      variables: {
        input: {
          id
        }
      }
    });

    onChange();

  }

  return (
    <div className={style.wrap}>

      {addModalOn && (
        <AddSpecieModal
          onAdd={onAdd}
          onClose={() => {
            setAddModalOn(false);
          }} />
      )}

      <h2>Species</h2>

      <ul>
        {species.map((specie) => (
          <li
            key={specie?.id || specie?.scientificName}>
            <button
              onClick={() => onDelete(specie)}>
              &times;
            </button>
            &nbsp;
            {specie?.commonName} (<em>{specie?.scientificName}</em>) [{specie?.id}]
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setAddModalOn(true);
        }}>
        + Add Specie
      </button>

    </div>
  );
}
