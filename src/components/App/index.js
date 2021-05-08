
import React from 'react';

import style from './index.module.scss';

import speciesData from '~/src/data/species';
import plantsData from '~/src/data/plants';

const App = () => {

  return (
    <div className={style.wrap}>
      <h1>Plants Watering Log</h1>

      <h3>Species</h3>
      <pre>{JSON.stringify(speciesData, null, 2)}</pre>

      <h3>Plants</h3>
      <pre>{JSON.stringify(plantsData, null, 2)}</pre>

    </div>
  )

}

export default App;
