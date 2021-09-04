
import React from 'react';
import { useKey } from 'react-use';
import classNames from 'classnames';

import * as style from './index.module.scss';

const Modal = ({
  children = null,
  width,
  disabled = false,
  onClickOff = () => { },
  onEnterKey = () => { },
  onEscKey = () => { }
}) => {

  function onClickOutsidePanel(e) {

    if (disabled) return;

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
        className={classNames({
          [style.panel]: true,
          [style.disabled]: disabled
        })}
        style={{ width }}
        onClick={(e) => { e.stopPropagation() }}>

        <div className={style.content}>
          {children}
        </div>

      </div>
    </div>
  );

}

export default Modal;
