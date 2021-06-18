
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import style from './index.module.scss';

import config from '~/src/config';

const Header = () => {

  const route = useSelector((state) => state.route);

  const {
    pages = []
  } = config?.header || { };

  return (
    <div className={style.wrap}>

      <h1>Planty</h1>

      {/* <ul className={style.nav}>
        {pages.map((page) => (
          <li
            key={page.route}
            className={classNames({
              [style.selected]: page.route === route
            })}>
            <a href={`#/${page.route}`}>{page.label}</a>
          </li>
        ))}
      </ul> */}

    </div>
  );

}

export default Header;
