
import React, { useState } from 'react';
import classNames from 'classnames';
import { useHash } from 'react-use';

import * as style from './index.module.scss';

const Sidebar = () => {

  const [ hash, setHash ] = useHash();

  return (
    <div className={style.wrap}>

      <h1>Planty</h1>

      <ul className={style.nav}>
        <li><a href="#/">Today</a></li>
        <li><a href="#/timeline">Timeline</a></li>
        <li><a href="#/edit">Edit</a></li>
      </ul>

    </div>
  );

}

export default Sidebar;
