import React from 'react';
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
    specie
  } = plant || { };

  return (
    <div className={style.wrap}>

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
