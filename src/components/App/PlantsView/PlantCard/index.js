import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import {
  IoPlayForward,
  IoWater
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { getDaysSinceLastWatering } from 'utils';

import style from './index.module.scss';

const PlantCard = ({
  plant = { },
  onWater = () => { },
  onDefer = () => { }
}) => {
  const {
    id,
    name,
    image,
    specie,
    dateNextWater
  } = plant || { };

  const mmtNextWater = moment(dateNextWater);
  const mmtToday = moment().startOf('day');

  const isOverdue = mmtToday.diff(mmtNextWater, 'days') > 0;
  const isDueToday = mmtToday.diff(mmtNextWater, 'days') >= 0;

  const nextWaterDateText = (isDueToday && !isOverdue) ? 'Today' : mmtNextWater.from(moment().startOf('day'));
  const daysSinceLastWatering = getDaysSinceLastWatering(plant);
  const wateredToday = daysSinceLastWatering === 0;

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
        <strong>{name}</strong>
        <Link
          to={`/plants/edit/${id}`}
          className={style.editBtn}>
          Edit
        </Link>
        <br />
        <em>{specie?.commonName}</em>
      </p>

      <p>

        Next water:&nbsp;
        <span className={style.nextWaterDate}>
          {nextWaterDateText}
        </span>

        <br />

        <em>
          Last watered&nbsp;
          <span className={style.lastWaterDate}>
            {getLastWaterDateText(plant)}
          </span>
        </em>

      </p>

      <div className={style.wrapActions}>

        <button
          className={style.waterBtn}
          disabled={wateredToday}
          onClick={onWater}>
          <i><IoWater /></i> Water
          {!isDueToday && (
            <> early</>
          )}
        </button>

        {!!isDueToday && (
          <button
            className={style.deferBtn}
            disabled={wateredToday}
            onClick={onDefer}>
            <i><IoPlayForward /></i> Later
          </button>
        )}
      </div>

    </div>
  );
};

export default PlantCard;