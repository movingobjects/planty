import React from 'react';

import style from './index.module.scss';

export default function PlantCard({
  plant = { },
  onEditClick = () => { }
}) {

  const {
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
        <strong>{name}</strong>
        <br />
        <em>{specie?.commonName}</em>
      </p>

      <button
        onClick={onEditClick}>
        Edit
      </button>

    </div>
  );

}
