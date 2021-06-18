
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';
import { RiAddLine } from 'react-icons/ri';

import {
  getDateLastWatered,
  getWateringHistoryArray,
  calcDateNextWater
} from '~/src/utils';

import style from './index.module.scss';

const PlantsView = () => {

  const [ hash, setHash ] = useHash();
  const [ dateTodayEnd ] = useState(
    moment()
      .endOf('day')
      .valueOf()
  );
  const [ dateTomorrowEnd ] = useState(
    moment()
      .add(1, 'days')
      .endOf('day')
      .valueOf()
  );


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

  function renderPlantCard(plant) {

    const specie          = species.find((s) => s.id === plant.specie),
          dateLastWatered = getDateLastWatered(plant),
          dueToday        = isDueToday(plant);

    const lastWateredText = dateLastWatered ? moment(dateLastWatered).fromNow() : 'Never',
          nextWaterText   = moment(plant.dateNextWater).calendar();

    return (
      <li
        key={plant.id}
        className={classNames({
          [style.dueToday]: dueToday
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

        <h4>Next watering</h4>
        <p>{nextWaterText}</p>

        <h4>Last watered</h4>
        <p>{lastWateredText}</p>

        <button
          className={style.standard}
          onClick={() => onWaterClick(plant.id)}>
          Water
        </button>

        {dueToday && (
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

  }

  function isDueToday(p) {
    return p.dateNextWater <= dateTodayEnd;
  }
  function isDueTomorrow(p) {
    return (
      p.dateNextWater > dateTodayEnd &&
      p.dateNextWater <= dateTomorrowEnd
    );
  }

  const plantsToday = plants.filter(isDueToday);
  const plantsTomorrow = plants.filter(isDueTomorrow);
  const plantsLater = plants.filter((p) => (
    !isDueToday(p) &&
    !isDueTomorrow(p)
  ));

  return (
    <div className={style.wrap}>

      <div className={style.wrapAddBtn}>
        <button
          onClick={onAddClick}>
          <RiAddLine
            size='4em' />
        </button>
      </div>

      {!!plantsToday.length && (
        <>
          <h2>Today</h2>
          <ul className={style.plants}>
            {plantsToday.map((plant) => renderPlantCard(plant))}
          </ul>
        </>
      )}

      {!!plantsTomorrow.length && (
        <>
          <h2>Tomorrow</h2>
          <ul className={style.plants}>
            {plantsTomorrow.map((plant) => renderPlantCard(plant))}
          </ul>
        </>
      )}

      <h2>Later</h2>
      <ul className={style.plants}>
        {plantsLater.map((plant) => renderPlantCard(plant))}
      </ul>

    </div>
  );

}

export default PlantsView;
