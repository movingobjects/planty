
import * as React from 'react';

import styles from './index.module.scss';

const SpeciesList = ({
  species = []
}) => {

  return (
    <div className={styles.wrap}>

      <h3>All species</h3>

      <ul>
        {species.map((specie) => (
          <li key={specie.id}>
            {specie.commonName}
          </li>
        ))}
      </ul>

    </div>
  );

}

export default SpeciesList;
