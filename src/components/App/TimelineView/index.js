
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from '@firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';

import {
  getDateLastWatered,
  sortByBirthDate,
  getWateringHistoryArray,
} from '~/src/utils';

import * as style from './index.module.scss';

const TimelineView = () => {

  const [ hash, setHash ] = useHash();

  const userId = useSelector((state) => state.userId);
  const plants = useSelector((state) => state.plants);

  const byBirthdate = [ ...plants ]
    .sort(sortByBirthDate)
    .reverse();

  function onEditClick(plantId) {
    setHash(`#/timeline/edit/${plantId}`);
  }

  return (
    <div className={style.wrap}>

      <ol>
        {byBirthdate.map((plant, index) => (
          <li key={plant.id}>
            <button
              onClick={() => onEditClick(plant.id)}>
              Edit
            </button>
            {plant.nickname}
            {plant.dateBorn && (
              <>&nbsp;({moment(plant.dateBorn).fromNow(true)})</>
            )}
          </li>
        ))}
      </ol>

    </div>
  );

}

export default TimelineView;
