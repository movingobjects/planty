import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getTimeFromLastWater } from 'utils';

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
    waterings,
    dateNextWater
  } = plant || { };

  const mmtNextWater = moment(dateNextWater),
        mmtToday     = moment().startOf('day');

  const isOverdue = mmtToday.diff(mmtNextWater, 'days') > 0,
        isToday   = mmtToday.diff(mmtNextWater, 'days') >= 0;

  const nextWaterDateText = (isToday && !isOverdue) ? 'Today' : mmtNextWater.from(moment().startOf('day')),
        lastWateredText   = getTimeFromLastWater(plant);

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
        Last watered: {lastWateredText}
      </p>

      <div className={style.wrapActions}>

        <button
          onClick={onWater}>
          Water
        </button>

        <button
          onClick={onDefer}>
          Defer 1 day
        </button>
      </div>

    </div>
  );

}
