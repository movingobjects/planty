
import * as React from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
import { map } from 'lodash';

import { getLatestWatering } from '~/src/utils';

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

  function getLastWateredText(plantId) {

    const plant        = plants.find((p) => p.id === plantId),
          lastWatering = getLatestWatering(plant);

    if (!lastWatering?.date) return null;

    const daysAgo = moment().diff(lastWatering.date, 'days');

    if (!daysAgo) {
      return 'Today';
    }

    if (daysAgo === 1) {
      return 'Yesterday';
    }

    return `${daysAgo} days ago`;

  }

  return (
    <div className={style.wrap}>

      <h2>Your plants</h2>

      <table
        className={style.plants}>
        <thead>
          <tr>
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
                <td>{plant.nickname}</td>
                <td>{specie?.commonName}</td>
                <td>{specie?.scientificName}</td>
                <td>{getLastWateredText(plant.id)}</td>
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
