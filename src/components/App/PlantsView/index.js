
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';

import {
  getDateLastWatered,
  calcDateNextWater
} from '~/src/utils';

import style from './index.module.scss';

const PlantsView = () => {

  const [ hash, setHash ] = useHash();

  const userId = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);
  const plants = useSelector((state) => state.plants);

  function onWaterClick(plantId) {

    const plant = plants.find((p) => p.id === plantId);

    if (!plant) return;

    const dateNextWater = calcDateNextWater(plant);

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        dateNextWater
      });

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}/wateringHistory`)
      .push({
        date: Date.now()
      });

  }
  function onDeferClick(plantId) {

    const plant = plants.find((p) => p.id === plantId);

    if (!plant) return;

    const dateNextWater = moment()
      .add(1, 'days')
      .startOf('day')
      .add(8, 'hours')
      .valueOf()

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        dateNextWater
      });

  }

  function onAddClick() {
    setHash(`#/add`);
  }
  function onEditClick(plantId) {
    setHash(`#/plant/${plantId}/edit`);
  }
  function onRemoveClick(plantId) {
    console.log(`Remove ${plantId}`);
  }

  const dateNow = Date.now();

  return (
    <div className={style.wrap}>

      <button
        onClick={onAddClick}>
        Add plant
      </button>

      <h2>Your plants</h2>

      <table
        className={style.plants}>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Plant</th>
            <th>Last Watered</th>
            <th>Estimated Next Watering</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => {

            const specie          = species.find((s) => s.id === plant.specie),
                  dateLastWatered = getDateLastWatered(plant),
                  dateNextWater   = plant.dateNextWater,
                  lastWateredText = dateLastWatered ? moment(dateLastWatered).fromNow() : 'Never',
                  nextWaterText   = dateNextWater ? moment(dateNextWater).fromNow() : '';

            const oneDay    = moment.duration(1, 'days').valueOf(),
                  isDueNow  = dateNextWater < dateNow,
                  isDueSoon = !isDueNow && (dateNextWater - dateNow) < oneDay;

            return (
              <tr
                key={plant.id}
                className={classNames({
                  [style.dueNow]: isDueNow,
                  [style.dueSoon]: isDueSoon
                })}>
                <td>
                  {(!!plant.iconIndex || plant.iconIndex === 0) && (
                    <p>
                      <img
                        src={`icons/icon-${plant.iconIndex + 1}.svg`}
                        width={75} />
                    </p>
                  )}
                </td>
                <td>
                  <p>
                    <strong>{plant.nickname}</strong><br />
                    {specie?.commonName} ({specie?.scientificName})
                  </p>
                  <p>
                    <button
                      onClick={() => onEditClick(plant.id)}>
                      Edit
                    </button>
                  </p>
                </td>
                <td>{lastWateredText}</td>
                <td>{nextWaterText}</td>
                <td>
                  <button
                    onClick={() => onWaterClick(plant.id)}>
                    Water
                  </button>
                  <br />
                  <button
                    onClick={() => onDeferClick(plant.id)}>
                    Move to Tomorrow
                  </button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>

    </div>
  );

}

export default PlantsView;
