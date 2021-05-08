
import * as React from 'react';

import style from './index.module.scss';

const LoginView = ({
  ready = false,
  onLoginClick = () => { }
}) => {

  return (
    <div className={style.wrap}>

      <div className={style.wrapContent}>

        {ready ? (
          <button
            onClick={onLoginClick}>
            Login
          </button>
        ) : (
          <p>Loading...</p>
        )}

      </div>

    </div>
  );

}

export default LoginView;
