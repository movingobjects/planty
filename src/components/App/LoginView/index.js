
import * as React from 'react';

import style from './index.module.scss';

const LoginView = ({
  ready = false,
  onLoginClick = () => { }
}) => {

  if (!ready) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className={style.wrap}>

      <button
        onClick={onLoginClick}>
        Login
      </button>

    </div>
  );

}

export default LoginView;
