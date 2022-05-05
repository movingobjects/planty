import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  getDateLastWatered,
  getWateringHistoryArray,
  calcDateNextWater
} from 'utils';

import style from './index.module.scss';

export default function PlantCard({
  plant = { },
  onWaterClick = () => { },
  onDeferClick = () => { }
}) {

  const {
    id,
    name,
    image,
    specie,
    dateNextWater
  } = plant || { };

  const mmtLastWatered = moment(getDateLastWatered(plant)),
        mmtNextWater   = moment(dateNextWater);

  const isOverdue = moment().diff(mmtNextWater, 'days') > 0,
        isToday   = moment().diff(mmtNextWater, 'days') >= 0;

  const nextWaterDateText = (isToday && !isOverdue) ? 'Today' : mmtNextWater.fromNow();

  return (
    <div className={classNames({
      [style.wrap]: true,
      [style.today]: isToday,
      [style.overdue]: isOverdue
    })}>

      {!!image?.length && (
        <img
          className={style.plantImg}
          alt={name}
          src={image} />
      )}

      <p>
        <strong>{name}</strong> <Link to={`/plants/edit/${id}`}>Edit</Link>
        <br />
        <em>{specie?.commonName}</em>
      </p>

      <p>
        Next water: <span className={style.nextWaterDate}>{nextWaterDateText}</span>
        <br />
        Last watered: {mmtLastWatered.fromNow()}
      </p>

      <div className={style.wrapActions}>

        <button
          onClick={onWaterClick}>
          Water
        </button>

        <button
          onClick={onDeferClick}>
          Defer 1 day
        </button>
      </div>

    </div>
  );

}
