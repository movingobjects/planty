
import * as React from 'react';

import style from './index.module.scss';

const SpeciesList = ({
  species = []
}) => {

  return (
    <div className={style.wrap}>

      <h2>All species</h2>

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
