
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHash } from 'react-use';
import firebase from '@firebase/app';

import {
  getDateLastWatered,
  getWateringHistoryArray,
  calcDateNextWater
} from '~/src/utils';

import style from './index.module.scss';

const PlantCard = ({
  plant,
  isDueToday = false
}) => {

  const userId  = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);

  const [ hash, setHash ] = useHash();

  const specie          = species.find((s) => s.id === plant.specie),
        dateLastWatered = getDateLastWatered(plant),
        lastWateredText = dateLastWatered ? moment(dateLastWatered).fromNow() : 'Never',
        nextWaterText   = moment(plant.dateNextWater).calendar();

  function onWaterClick() {

    const dateNextWater = calcDateNextWater([
      ...getWateringHistoryArray(plant).map((item) => item.date),
      Date.now()
    ]);

    firebase.database()
      .ref(`users/${userId}/plants/${plant.id}`)
      .update({
        dateNextWater
      });

    firebase.database()
      .ref(`users/${userId}/plants/${plant.id}/wateringHistory`)
      .push({
        date: Date.now()
      });

  }
  function onDeferClick() {

    const dateNextWater = moment()
      .add(1, 'days')
      .startOf('day')
      .add(8, 'hours')
      .valueOf()

    firebase.database()
      .ref(`users/${userId}/plants/${plant.id}`)
      .update({
        dateNextWater
      });

  }

  function onEditClick() {
    setHash(`#/plant/${plant.id}/edit`);
  }

  return (
    <li
      className={classNames({
        [style.wrap]: true,
        [style.hasImage]: !!plant?.image?.length,
        [style.dueToday]: isDueToday
      })}>

      <div className={style.wrapImage}>
        {!!plant?.image?.length && (
          <img src={plant?.image} />
        )}
      </div>

      <div className={style.wrapEditBtn}>
        <button
          onClick={onEditClick}>
          Edit
        </button>
      </div>

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
        onClick={onWaterClick}>
        Water
      </button>

      {isDueToday && (
        <>
          <br />
          <button
            className={style.standard}
            onClick={onDeferClick}>
            Move to Tomorrow
          </button>
        </>
      )}
    </li>
  );

}

export default PlantCard;