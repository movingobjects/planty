
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import style from './index.module.scss';

const Header = () => {

  const route = useSelector((state) => state.route);

  return (
    <div className={style.wrap}>

      <h1>Planty</h1>

    </div>
  );

}

export default Header;
