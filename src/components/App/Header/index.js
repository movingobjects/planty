import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React, {
  useRef, useState
} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { useClickAway } from 'react-use';

import * as atoms from 'atoms';

import style from './index.module.scss';

const Header = ({
  onSignOut = () => { }
}) => {
  const ref = useRef(null);
  const user = useAtomValue(atoms.user);
  const { pathname } = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useClickAway(ref, () => {
    setUserMenuOpen(false);
  });

  function onProfileImgClick() {
    setUserMenuOpen(true);
  }

  function onSignOutClick(e) {
    e.preventDefault();
    onSignOut();
  }

  const renderMenuLink = (title, path) => (
    <li className={classNames({
      [style.selected]: (path === pathname)
    })}>
      <Link to={path} alt={title}>{title}</Link>
    </li>
  );

  return (
    <div className={style.wrap}>

      <div className={style.wrapTitle}>
        <h1><Link to="/" alt="Planty">Planty</Link></h1>
      </div>

      <div
        className={style.wrapUserMenu}>
        <div
          className={style.wrapProfileImg}
          onClick={onProfileImgClick}>
          {!!user?.profileImg?.length && (
            <img
              className={style.profileImg}
              alt={user?.firstName}
              src={user?.profileImg} />
          )}
        </div>
        <ul
          ref={ref}
          className={classNames({
            [style.userMenu]: true,
            [style.open]: userMenuOpen
          })}>
          {renderMenuLink('Plants', '/plants')}
          {renderMenuLink('Timeline', '/timeline')}
          {renderMenuLink('Species', '/species')}
          {renderMenuLink('Rooms', '/rooms')}
          <li>
            <Link to="/edit-profile" alt="Edit profile">Edit profile</Link>
          </li>
          <li>
            <Link
              to="/"
              alt="Sign out"
              onClick={onSignOutClick}>
              Sign out
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Header;