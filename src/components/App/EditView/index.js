
import React from 'react';
import { useSelector } from 'react-redux';
import { RiAddLine } from 'react-icons/ri';
import { useHash } from 'react-use';

import * as style from './index.module.scss';

const EditView = () => {

  const [ hash, setHash ] = useHash();

  const plants = useSelector((state) => state.plants);
  const species = useSelector((state) => state.species);

  function onNewPlantClick() {
    setHash(`#/edit/new/plant`);
  }
  function onNewSpecieClick() {
    setHash(`#/edit/new/specie`);
  }

  function onEditPlantClick(id) {
    setHash(`#/edit/plant/${id}`);
  }
  function onEditSpecieClick(id) {
    setHash(`#/edit/specie/${id}`);
  }

  return (
    <div className={style.wrap}>

      <h2>Plants</h2>

      <button
        onClick={onNewPlantClick}>
        New plant
      </button>

      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <button
              onClick={() => onEditPlantClick(plant.id)}>
              Edit
            </button>
            {plant.nickname}
          </li>
        ))}
      </ul>

      <h2>Species</h2>

      <button
        onClick={onNewPlantClick}>
        New plant
      </button>

      <ul>
        {species.map((specie) => (
          <li key={specie.id}>
            <button
              onClick={() => onEditSpecieClick(specie.id)}>
              Edit
            </button>
            {specie.commonName}
          </li>
        ))}
      </ul>

    </div>
  );

}

export default EditView;
