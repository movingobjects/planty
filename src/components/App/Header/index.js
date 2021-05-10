
import * as React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import style from './index.module.scss';

const Header = () => {

  const route = useSelector((state) => state.route);

  return (
    <div className={style.wrap}>

      <h1>Plant Watering Log</h1>

      <ul className={style.nav}>
        <li className={classNames({
          [style.selected]: route === ''
        })}>
          <a href='#/'>Your plants</a>
        </li>
        <li className={classNames({
          [style.selected]: route === 'species'
        })}>
          <a href='#/species'>All species</a>
        </li>
      </ul>

    </div>
  );

}

export default Header;
