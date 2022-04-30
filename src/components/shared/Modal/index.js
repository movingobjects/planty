
import React from 'react';
import { useKey } from 'react-use';

import style from './index.module.scss';

export default function Modal({
  children = null,
  width,
  onClickOff = () => { },
  onEnterKey = () => { },
  onEscKey = () => { }
}) {

  function onClickOutsidePanel(e) {

    e.preventDefault();
    e.stopPropagation();

    onClickOff(e);

  }

  useKey('Enter', (e) => onEnterKey(e));
  useKey('Escape', (e) => onEscKey(e));

  return (
    <div
      className={style.wrap}
      onClick={onClickOutsidePanel}>

      <div
        className={style.panel}
        style={{ width }}
        onClick={(e) => { e.stopPropagation() }}>

        <div className={style.content}>
          {children}
        </div>

      </div>
    </div>
  );

}
