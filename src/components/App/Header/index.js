import React, { useContext } from 'react';
import classNames from 'classnames';
import {
  Link,
  useLocation
} from 'react-router-dom';

import { AppContext } from 'components/App';
import style from './index.module.scss';

export default function Header({
  onSignOut = () => { }
}) {

  const { user } = useContext(AppContext);
  const { pathname } = useLocation();

  const renderMenuLink = (title, path) => {

    return (
      <li className={classNames({
        [style.selected]: (path === pathname)
      })}>
        <Link to={path} alt={title}>{title}</Link>
      </li>
    );
  }

  function onSignOutClick(e) {
    e.preventDefault();
    onSignOut();
  }

  return (
    <div className={style.wrap}>

      <div className={style.wrapTitle}>
        <h1><Link to='/' alt='Planty'>Planty</Link></h1>
      </div>

      <div className={style.wrapMenu}>
        <ul>
          {renderMenuLink('Plants', '/plants')}
          {renderMenuLink('Timeline', '/timeline')}
          {renderMenuLink('Species', '/species')}
          {renderMenuLink('Rooms', '/rooms')}
        </ul>
      </div>

      <div className={style.wrapUserMenu}>
        <div className={style.wrapProfileImg}>
          {!!user?.profileImg?.length && (
            <img
              alt={user?.firstName}
              src={user?.profileImg} />
            )}
          </div>
        <p>Hello {user?.firstName}</p>
        <p>
          <Link to='/edit-profile' alt='Edit profile'>Edit profile</Link>
          <Link
            to='/'
            alt='Sign out'
            onClick={onSignOutClick}>
            Sign out
          </Link>
        </p>
      </div>

    </div>
  )

}
