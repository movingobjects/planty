
import React from 'react';

import style from './index.module.scss';

const LoginView = ({
  ready = false,
  onLoginClick = () => { }
}) => {

  return (
    <div className={style.wrap}>

      {ready ? (
        <>
          <h1>Planty</h1>

          <button
            onClick={onLoginClick}>
            Login
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

export default LoginView;
