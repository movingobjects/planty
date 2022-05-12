import React, { useState, useContext } from 'react';
import moment from 'moment';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { Routes, Route, Link } from 'react-router-dom';

import { useStorage } from 'hooks/storage';
import { AppContext } from 'components/App';
import { calcDateNextWater } from 'utils';

import AddPlantModal from './AddPlantModal';
import EditPlantModal from './EditPlantModal';
import PlantCard from './PlantCard';

import style from './index.module.scss';

export default function PlantsView() {

  let {
    plants,
    rooms,
    onPlantsChange
  } = useContext(AppContext);

  const { uploadFile } = useStorage();

  const [ roomFilter, setRoomFilter ] = useState();

  plants = plants.filter((p) => !p.dateRetired);

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
    } else {
      delete plantData.image;
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

  function onPlantWater(plantId) {

    const plant = plants.find((p) => p.id === plantId);
    if (!plant) return;

    const waterings = [
      ...plant.waterings,
      { date: moment().format('YYYY-MM-DD') }
    ];

    const dateNextWater = calcDateNextWater(waterings);

    onSave({
      id: plantId,
      waterings,
      dateNextWater
    });

  }
  function onPlantDefer(plantId) {

    const plant = plants.find((p) => p.id === plantId);
    if (!plant) return;

    const dateNextWater = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');

    onSave({
      id: plantId,
      dateNextWater
    })

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

      <ul className={style.roomFilter}>
        <li
          className={(!roomFilter?.length) ? style.selected : null}
          onClick={() => setRoomFilter(null)}>
          Any room
        </li>
        {rooms.map((r) => (
          <li
            className={(roomFilter === r.id) ? style.selected : null}
            onClick={() => setRoomFilter(r.id)}>
            {r.name}
          </li>
        ))}
      </ul>

      <div className={style.wrapAdd}>
        <Link
          to='/plants/add'
          alt='Add plant'>
          Add plant
        </Link>
      </div>

      <ul className={style.plants}>
        {plants
          .filter((p) => (
            !roomFilter?.length ||
            p.roomId === roomFilter
          ))
          .map((plant) => (
            <li
              key={plant?.id || plant?.name}>
              <PlantCard
                plant={plant}
                onWater={() => onPlantWater(plant?.id)}
                onDefer={() => onPlantDefer(plant?.id)} />
            </li>
        ))}
      </ul>

    </div>
  );

}
