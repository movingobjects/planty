
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';

import {
  getDateLastWatered,
  getWateringHistoryArray,
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

    const dateNextWater = calcDateNextWater([
      ...getWateringHistoryArray(plant).map((item) => item.date),
      Date.now()
    ]);

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

      <div className={style.wrapAddBtn}>
        <button
          onClick={onAddClick}>
          Add new plant
        </button>
      </div>

      <h2>Your plants</h2>

      <ul
        className={style.plants}>
        {plants.map((plant) => {

          const specie          = species.find((s) => s.id === plant.specie),
                dateLastWatered = getDateLastWatered(plant),
                dateNextWater   = plant.dateNextWater,
                lastWateredText = dateLastWatered ? moment(dateLastWatered).fromNow() : 'Never',
                nextWaterText   = moment(dateNextWater).calendar();

          const isDueToday = moment(dateNextWater).isSame(dateNow, 'day'),
                isOverdue  = !isDueToday && dateNextWater < dateNow;

          return (
            <li
              key={plant.id}
              className={classNames({
                [style.overdue]: isOverdue,
                [style.dueToday]: isDueToday
              })}>

              <div className={style.wrapEditBtn}>
                <button
                  onClick={() => onEditClick(plant.id)}>
                  Edit
                </button>
              </div>

              {(!!plant.iconIndex || plant.iconIndex === 0) && (
                <p>
                  <img
                    src={`icons/icon-${plant.iconIndex + 1}.svg`}
                    width={75} />
                </p>
              )}

              <p>
                <strong>{plant.nickname}</strong><br />
                {specie?.commonName}
              </p>

              <p>Last watered {lastWateredText}</p>
              <p>Next watering: {nextWaterText}</p>

              <button
                className={style.standard}
                onClick={() => onWaterClick(plant.id)}>
                {(isDueToday || isOverdue) ? 'Water' : 'Water Early'}
              </button>

              {(isDueToday || isOverdue) && (
                <>
                  <br />
                  <button
                    onClick={() => onDeferClick(plant.id)}>
                    Move to Tomorrow
                  </button>
                </>
              )}
            </li>
          );

        })}
      </ul>

    </div>
  );

}

export default PlantsView;
