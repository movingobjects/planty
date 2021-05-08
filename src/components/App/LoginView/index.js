
import * as React from 'react';

import styles from './index.module.scss';

const LoginView = ({
  ready = false,
  onLoginClick = () => { }
}) => {

  return (
    <div className={styles.wrap}>

      <div className={styles.wrapContent}>

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
