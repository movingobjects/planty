import React, { useState, useContext } from 'react';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';

import { useStorage } from 'hooks/storage';
import { AppContext } from 'components/App';

import AddPlantModal from './AddPlantModal';
import EditPlantModal from './EditPlantModal';
import PlantCard from './PlantCard';

import style from './index.module.scss';

export default function PlantsView({
  onChange = () => { }
}) {

  const { uploadFile } = useStorage();
  const { plants } = useContext(AppContext);
  const [ addModalOn, setAddModalOn ] = useState(false);
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
      }
    });

    onChange();

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
      }
    });

    onChange();

  }
  async function onDelete(plantId) {

    await API.graphql({
      query: mutations.deletePlant,
      variables: {
        input: {
          id: plantId
        }
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

      {!!editingPlantId?.length && (
        <EditPlantModal
          plant={plants.find((p) => p.id === editingPlantId)}
          onDelete={onDelete}
          onSave={onSave}
          onClose={() => {
            setEditingPlantId(null);
          }} />
      )}

      <h2>Plants</h2>

      <ul className={style.plants}>
        {plants.map(plant => (
          <li
            key={plant?.id || plant?.name}>
            <PlantCard
              plant={plant}
              onEditClick={() => {
                setEditingPlantId(plant.id);
              }} />
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setAddModalOn(true);
        }}>
        + Add Plant
      </button>

    </div>
  );

}
