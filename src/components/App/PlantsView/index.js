import React, { useState, useContext } from 'react';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { Routes, Route, Link } from 'react-router-dom';

import { useStorage } from 'hooks/storage';
import { AppContext } from 'components/App';

import AddPlantModal from './AddPlantModal';
import EditPlantModal from './EditPlantModal';
import PlantCard from './PlantCard';

import style from './index.module.scss';

export default function PlantsView() {

  const {
    plants,
    onPlantsChange
  } = useContext(AppContext);
  const { uploadFile } = useStorage();
  const [ editingPlantId, setEditingPlantId ] = useState(null);

  function getPlantImagePath(file, plantId) {
    const timestamp = Date.now(),
          ext       = file?.name?.split('.').pop();
    return `plants/${plantId}/${timestamp}.${ext}`;
  }

  async function onAdd(plantData) {

    const hasNewImage = !!plantData?.image?.name?.length;

    if (hasNewImage) {
      plantData.image = await uploadFile(
        plantData?.image,
        getPlantImagePath(plantData?.image, plantData?.id)
      );
    }

    await API.graphql({
      query: mutations.createPlant,
      variables: {
        input: plantData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onPlantsChange();

  }
  async function onSave(plantData) {

    const hasNewImage = !!plantData?.image?.name?.length;

    if (hasNewImage) {
      plantData.image = await uploadFile(
        plantData?.image,
        getPlantImagePath(plantData?.image, plantData?.id)
      );
    }

    await API.graphql({
      query: mutations.updatePlant,
      variables: {
        input: plantData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onPlantsChange();

  }
  async function onDelete(plantId) {

    await API.graphql({
      query: mutations.deletePlant,
      variables: {
        input: {
          id: plantId
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onPlantsChange();

  }

  return (
    <div className={style.wrap}>

      <Routes>
        <Route path='edit/:id' element={(
          <EditPlantModal
            onDelete={onDelete}
            onSave={onSave} />
        )} />
        <Route path='add' element={(
          <AddPlantModal
            onAdd={onAdd} />
        )} />
      </Routes>

      <h2>Plants</h2>

      <div className={style.wrapAdd}>
        <Link
          to='/plants/add'
          alt='Add plant'>
          Add plant
        </Link>
      </div>

      <ul className={style.plants}>
        {plants.map(plant => (
          <li
            key={plant?.id || plant?.name}>
            <PlantCard
              plant={plant} />
          </li>
        ))}
      </ul>

    </div>
  );

}
