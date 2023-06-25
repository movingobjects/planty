import { useAtomValue } from 'jotai';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Link,
  Route,
  Routes
} from 'react-router-dom';

import * as atoms from 'atoms';
import useApi from 'hooks/useApi';
import { calcDateNextWater } from 'utils';

import AddPlantModal from './AddPlantModal';
import EditPlantModal from './EditPlantModal';
import PlantCard from './PlantCard';

import style from './index.module.scss';

const PlantsView = () => {
  const plants = useAtomValue(atoms.activePlants);
  const rooms = useAtomValue(atoms.activeRooms);

  const {
    createPlant,
    updatePlant,
    deletePlant
  } = useApi();

  const [roomFilter, setRoomFilter] = useState();

  function getPlantsCount(roomId) {
    return plants
      ?.filter((p) => p.roomId === roomId)
      ?.length;
  }

  function onPlantWater(plantId) {
    const plant = plants.find((p) => p.id === plantId);
    if (!plant) return;

    const waterings = [
      ...plant.waterings,
      { date: moment().format('YYYY-MM-DD') }
    ];

    const dateNextWater = calcDateNextWater(waterings);

    updatePlant({
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

    updatePlant({
      id: plantId,
      dateNextWater
    });
  }

  return (
    <div className={style.wrap}>

      <Routes>
        <Route
          path="edit/:id"
          element={(
            <EditPlantModal
              onDelete={deletePlant}
              onSave={updatePlant} />
          )} />
        <Route
          path="add"
          element={(
            <AddPlantModal
              onAdd={createPlant} />
          )} />
      </Routes>

      <h2>Plants</h2>

      <ul className={style.roomFilter}>
        <li
          className={(!roomFilter?.length) ? style.selected : null}
          onClick={() => setRoomFilter(null)}>
          Any room ({plants.length})
        </li>
        {rooms.map((r) => (
          <li
            key={r.id}
            className={(roomFilter === r.id) ? style.selected : null}
            onClick={() => setRoomFilter(r.id)}>
            {r.name} ({getPlantsCount(r.id)})
          </li>
        ))}
      </ul>

      <div className={style.wrapAdd}>
        <Link
          to="/plants/add"
          alt="Add plant">
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
};

export default PlantsView;