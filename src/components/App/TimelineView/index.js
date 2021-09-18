
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import firebase from '@firebase/app';
import { map, times } from 'lodash';
import moment from 'moment';
import { useHash } from 'react-use';

import {
  getDateLastWatered,
  getWateringHistoryArray,
} from '~/src/utils';

import * as style from './index.module.scss';

const TimelineView = () => {

  const [ hash, setHash ] = useHash();

  const userId = useSelector((state) => state.userId);
  const plants = useSelector((state) => state.plants);

  function onEditClick(plantId) {
    setHash(`#/timeline/edit/${plantId}`);
  }

  return (
    <div className={style.wrap}>

      <ol>
        {plants.map((plant, index) => (
          <li key={plant.id}>
            <button
              onClick={() => onEditClick(plant.id)}>
              Edit
            </button>
            {plant.nickname}
          </li>
        ))}
      </ol>

    </div>
  );

}

export default TimelineView;
