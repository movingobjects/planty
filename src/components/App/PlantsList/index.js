
import React from 'react';
import firebase from 'firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';

import {
  getLatestWatering,
  getDateLastWatered,
  getAvgWaterInterval
} from '~/src/utils';

import style from './index.module.scss';

const PlantsList = ({
  userId = null,
  plants = [],
  species = []
}) => {

  const [ hash, setHash ] = useHash();

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

  function onEditClick(plantId) {
    setHash(`#/plant/${plantId}/edit`);
  }
  function onRemoveClick(plantId) {
    console.log(`Remove ${plantId}`);
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
            <th>Last Watered</th>
            <th>Avg Interval</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => {

            const specie          = species.find((s) => s.id === plant.specie),
                  dateLastWatered = getDateLastWatered(plant),
                  avgInterval     = getAvgWaterInterval(plant),
                  lastWateredText = dateLastWatered ? moment(dateLastWatered).fromNow() : 'Never',
                  avgIntervalText = avgInterval ? moment.duration(avgInterval).humanize() : null;

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
                <td>
                  <p>
                    <strong>{plant.nickname}</strong><br />
                    {specie?.commonName} ({specie?.scientificName})
                  </p>
                  <p>
                    <button
                      disabled
                      onClick={() => onEditClick(plant.id)}>
                      Edit
                    </button>
                    <button
                      disabled
                      onClick={() => onRemoveClick(plant.id)}>
                      Remove
                    </button>
                  </p>
                </td>
                <td>{lastWateredText}</td>
                <td>{avgIntervalText}</td>
                <td>
                  <button
                    onClick={() => onWaterClick(plant.id)}>
                    Water
                  </button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>

    </div>
  );

}

export default PlantsList;
