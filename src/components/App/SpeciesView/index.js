import React, { useContext } from 'react';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { Routes, Route, Link } from 'react-router-dom';

import { AppContext } from 'components/App';

import AddSpecieModal from './AddSpecieModal';
import EditSpecieModal from './EditSpecieModal';

import style from './index.module.scss';

export default function SpeciesView() {

  const {
    species,
    onSpeciesChange
  } = useContext(AppContext);

  async function onAdd(specieData) {

    await API.graphql({
      query: mutations.createSpecie,
      variables: {
        input: specieData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onSpeciesChange();

  }
  async function onSave(specieData) {

    await API.graphql({
      query: mutations.updateSpecie,
      variables: {
        input: specieData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onSpeciesChange();

  }
  async function onDelete(specieId) {

    await API.graphql({
      query: mutations.deleteSpecie,
      variables: {
        input: {
          id: specieId
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onSpeciesChange();

  }

  return (
    <div className={style.wrap}>

      <Routes>
        <Route path='edit/:id' element={(
          <EditSpecieModal
            onDelete={onDelete}
            onSave={onSave} />
        )} />
        <Route path='add' element={(
          <AddSpecieModal
            onAdd={onAdd} />
        )} />
      </Routes>

      <h2>Species</h2>

      <div className={style.wrapAdd}>
        <Link
          to='/species/add'
          alt='Add specie'>
          Add specie
        </Link>
      </div>

      <ul>
        {species.map((specie) => (
          <li
            key={specie?.id || specie?.scientificName}>
            {specie?.commonName} (<em>{specie?.scientificName}</em>)
            &nbsp;
            <Link to={`/species/edit/${specie?.id}`}>Edit</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
