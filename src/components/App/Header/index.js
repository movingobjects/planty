
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import * as style from './index.module.scss';

const Header = () => {

  const route = useSelector((state) => state.route);

  return (
    <div className={style.wrap}>

      <h1>Planty</h1>

      <ul className={style.nav}>
        <li><a href="#/">Today</a></li>
        <li><a href="#/timeline">Timeline</a></li>
        <li><a href="#/species">Species</a></li>
      </ul>

    </div>
  );

}

export default Header;
