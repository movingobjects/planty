import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getDaysSinceLastWatering } from 'utils';

import style from './index.module.scss';

export default function PlantCard({
  plant = { },
  onWater = () => { },
  onDefer = () => { }
}) {

  const {
    id,
    name,
    image,
    specie,
    dateNextWater
  } = plant || { };

  const mmtNextWater = moment(dateNextWater),
        mmtToday     = moment().startOf('day');

  const isOverdue  = mmtToday.diff(mmtNextWater, 'days') > 0,
        isDueToday = mmtToday.diff(mmtNextWater, 'days') >= 0;

  const nextWaterDateText     = (isDueToday && !isOverdue) ? 'Today' : mmtNextWater.from(moment().startOf('day')),
        daysSinceLastWatering = getDaysSinceLastWatering(plant),
        wateredToday          = daysSinceLastWatering === 0;

  function getLastWaterDateText() {
    if (daysSinceLastWatering === null) {
      return 'Never';
    } else if (daysSinceLastWatering === 0) {
      return 'Today';
    } else if (daysSinceLastWatering === 1) {
      return 'Yesterday';
    } else {
      return `${daysSinceLastWatering} days ago`;
    }
  }

  return (
    <div className={classNames({
      [style.wrap]: true,
      [style.dueToday]: isDueToday,
      [style.overdue]: isOverdue,
      [style.wateredToday]: wateredToday
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

        Next water:&nbsp;
        <span className={style.nextWaterDate}>
          {nextWaterDateText}
        </span>

        <br />

        Last watered:&nbsp;
        <span className={style.lastWaterDate}>
          {getLastWaterDateText(plant)}
        </span>

      </p>

      <div className={style.wrapActions}>

        <button
          className={style.waterBtn}
          disabled={wateredToday}
          onClick={onWater}>
          Water
        </button>

        <button
          className={style.deferBtn}
          disabled={wateredToday}
          onClick={onDefer}>
          Defer 1 day
        </button>
      </div>

    </div>
  );

}
