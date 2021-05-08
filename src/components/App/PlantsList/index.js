
import * as React from 'react';
import firebase from 'firebase/app';

import style from './index.module.scss';

const PlantsList = ({
  userId = null,
  plants = [],
  species = []
}) => {

  function onSelectSpecies(plantId, speciesId) {

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        species: speciesId
      });

  }

  return (
    <div className={style.wrap}>

      <h2>Your plants</h2>

      <table>
        <thead>
          <tr>
            <th>Plant</th>
            <th>Specie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <ul>
        {plants.map((plant) => {

          const specie = species.find((s) => s.id === plant.specie);

          return (
            <li key={plant.id}>
              {plant.nickname}
              {specie && (
                <span className={style.specie}>
                  &nbsp;({specie.scientificName})
                </span>
              )}
            </li>
          )
        })}
      </ul>

    </div>
  );

}

export default PlantsList;
