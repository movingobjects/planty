
import * as React from 'react';

import styles from './index.module.scss';

const PlantsList = ({
  plants = []
}) => {

  return (
    <div className={styles.wrap}>

      <h3>Your plants</h3>

      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            {plant.nickname}
          </li>
        ))}
      </ul>

    </div>
  );

}

export default PlantsList;
