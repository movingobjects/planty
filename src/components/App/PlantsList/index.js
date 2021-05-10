
import * as React from 'react';
import firebase from 'firebase/app';
import { map, times } from 'lodash';

import {
  getLatestWatering,
  getWateredLastText
} from '~/src/utils';

import style from './index.module.scss';

const PlantsList = ({
  userId = null,
  plants = [],
  species = []
}) => {

  function onWaterClick(plantId) {
    firebase.database()
      .ref(`users/${userId}/plants/${plantId}/wateringHistory`)
      .push({
        date: Date.now()
      })
  }

  function onSelectIcon(plantId, iconIndex) {
    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        iconIndex
      })
  }

  return (
    <div className={style.wrap}>

      <h2>Your plants</h2>

      <table
        className={style.plants}>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Plant</th>
            <th>Specie (Common)</th>
            <th>Specie (Scientific)</th>
            <th>Last Watered</th>
            <th>Water</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => {

            const specie = species.find((s) => s.id === plant.specie);

            return (
              <tr
                key={plant.id}>
                <td>
                  {(!!plant.iconIndex || plant.iconIndex === 0) && (
                    <p>
                      <img
                        src={`icons/icon-${plant.iconIndex + 1}.svg`}
                        width={75} />
                    </p>
                  )}
                </td>
                <td><strong>{plant.nickname}</strong></td>
                <td>{specie?.commonName}</td>
                <td>{specie?.scientificName}</td>
                <td>{getWateredLastText(plant)}</td>
                <th>
                  <button
                    onClick={() => onWaterClick(plant.id)}>
                    Water
                  </button>
                </th>
              </tr>
            )
          })}

        </tbody>
      </table>

    </div>
  );

}

export default PlantsList;
