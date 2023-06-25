import { useAtomValue } from 'jotai';
import React from 'react';
import {
  Link, Route, Routes
} from 'react-router-dom';

import * as atoms from 'atoms';
import useApi from 'hooks/useApi';

import AddSpecieModal from './AddSpecieModal';
import EditSpecieModal from './EditSpecieModal';

import style from './index.module.scss';

const SpeciesView = () => {
  const species = useAtomValue(atoms.species);

  const {
    createSpecie,
    updateSpecie,
    deleteSpecie
  } = useApi();

  return (
    <div className={style.wrap}>

      <Routes>
        <Route
          path="edit/:id"
          element={(
            <EditSpecieModal
              onDelete={deleteSpecie}
              onSave={updateSpecie} />
          )} />
        <Route
          path="add"
          element={(
            <AddSpecieModal
              onAdd={createSpecie} />
          )} />
      </Routes>

      <h2>Species</h2>

      <div className={style.wrapAdd}>
        <Link
          to="/species/add"
          alt="Add specie">
          Add specie
        </Link>
      </div>

      <ul>
        {species.map((specie) => (
          <li
            key={specie?.id || specie?.scientificName}>
            <Link to={`/species/edit/${specie?.id}`}>Edit</Link>
            &nbsp;
            {specie?.commonName} (<em>{specie?.scientificName}</em>)
          </li>
        ))}
      </ul>

    </div>
  );
};

export default SpeciesView;