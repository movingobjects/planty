import React from 'react';

import style from './index.module.scss';

export default function Header({
  onSignOut = () => { }
}) {

  return (
    <div className={style.wrap}>
      <div className={style.wrapTitle}>
        <h1>Planty</h1>
      </div>
      <div className={style.userMenu}>
        <button onClick={onSignOut}>Sign out</button>
      </div>
    </div>
  )

}
