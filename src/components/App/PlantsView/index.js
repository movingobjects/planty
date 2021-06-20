
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from '@firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';
import { RiAddLine } from 'react-icons/ri';

import PlantCard from './PlantCard';

import {
  getDateLastWatered,
  getWateringHistoryArray,
  calcDateNextWater
} from '~/src/utils';

import style from './index.module.scss';

const PlantsView = () => {

  const [ hash, setHash ] = useHash();
  const [ dateTodayEnd ] = useState(
    moment()
      .endOf('day')
      .valueOf()
  );
  const [ dateTomorrowEnd ] = useState(
    moment()
      .add(1, 'days')
      .endOf('day')
      .valueOf()
  );

  const userId = useSelector((state) => state.userId);
  const plants = useSelector((state) => state.plants);

  function onAddClick() {
    setHash(`#/add`);
  }

  function isDueToday(p) {
    return p.dateNextWater <= dateTodayEnd;
  }
  function isDueTomorrow(p) {
    return (
      p.dateNextWater > dateTodayEnd &&
      p.dateNextWater <= dateTomorrowEnd
    );
  }

  const plantsToday = plants.filter(isDueToday);
  const plantsTomorrow = plants.filter(isDueTomorrow);
  const plantsLater = plants.filter((p) => (
    !isDueToday(p) &&
    !isDueTomorrow(p)
  ));

  return (
    <div className={style.wrap}>

      <div className={style.wrapAddBtn}>
        <button
          onClick={onAddClick}>
          <RiAddLine
            size='4em' />
        </button>
      </div>

      {!!plantsToday.length && (
        <>
          <h2>Today</h2>
          <ul className={style.plants}>
            {plantsToday.map((plant) => (
              <PlantCard
                key={`plantsToday-${plant.id}`}
                plant={plant}
                isDueToday={true} />
            ))}
          </ul>
        </>
      )}

      {!!plantsTomorrow.length && (
        <>
          <h2>Tomorrow</h2>
          <ul className={style.plants}>
            {plantsTomorrow.map((plant) => (
              <PlantCard
                key={`plantsTomorrow-${plant.id}`}
                plant={plant} />
            ))}
          </ul>
        </>
      )}

      <h2>Later</h2>
      <ul className={style.plants}>
        {plantsLater.map((plant) => (
          <PlantCard
            key={`plantsLater-${plant.id}`}
            plant={plant} />
        ))}
      </ul>

    </div>
  );

}

export default PlantsView;
