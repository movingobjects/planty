import React, { useState, useContext } from 'react';
import { API, Storage } from 'aws-amplify';
import {
  createPlant,
  deletePlant
} from 'graphql/mutations';

import { AppContext } from 'components/App';
import AddPlantModal from './AddPlantModal';

import style from './index.module.scss';

export default function PlantsView({
  onChange = () => { }
}) {

  const { plants } = useContext(AppContext);
  const [ addModalOn, setAddModalOn ] = useState(false);

  async function onAdd(plantData) {

    if (plantData?.image) {
      const filename = plantData?.image?.name;
      await Storage.put(filename, plantData?.image);
      plantData.image = filename;
    }

    await API.graphql({
      query: createPlant,
      variables: {
        input: plantData
      }
    });

    onChange();

  }
  async function onDelete({ id }) {

    await API.graphql({
      query: deletePlant,
      variables: {
        input: { id }
      }
    });

    onChange();

  }

  return (
    <div className={style.wrap}>

      {addModalOn && (
        <AddPlantModal
          onAdd={onAdd}
          onClose={() => {
            setAddModalOn(false);
          }} />
      )}

      <h2>Plants</h2>

      <button
        onClick={() => {
          setAddModalOn(true);
        }}>
        Add Plant
      </button>

      <ul>
        {plants.map(plant => (
          <li
            key={plant?.id || plant?.name}>
            <button
              onClick={() => onDelete(plant?.id)}>
              &times;
            </button>
            &nbsp;
            {!!plant?.image && (
              <img
                alt={plant?.name}
                src={plant?.image}
                style={{
                  width: 50
                }} />
            )}
            {plant?.name} ({plant?.specie?.commonName}) [{plant?.id}]
          </li>
        ))}
      </ul>

    </div>
  );

}
