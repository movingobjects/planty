import React, {
  useState,
  useContext
} from 'react';
import * as mutations from 'graphql/mutations';
import { API } from 'aws-amplify';

import style from './index.module.scss';

import { AppContext } from 'components/App';
import EditProfileModal from './EditProfileModal';

export default function Header({
  onSignOut = () => { }
}) {

  const { user } = useContext(AppContext);
  const [ editModalOn, setEditModalOn ] = useState(false);

  function onEditProfileClick() {
    setEditModalOn(true);
  }

  async function onSaveProfile(userData) {

    await API.graphql({
      query: mutations.updateUser,
      variables: {
        input: userData
      }
    });

    console.log('User changed', userData);

  }

  return (
    <div className={style.wrap}>

      {editModalOn && (
        <EditProfileModal
          user={user}
          onSave={onSaveProfile}
          onClose={() => {
            setEditModalOn(false);
          }} />
      )}

      <div className={style.wrapTitle}>
        <h1>Planty</h1>
      </div>

      <div className={style.wrapUserMenu}>
        <p>
          Hello {user?.firstName}
          &nbsp;(<a href="#" onClick={onEditProfileClick}>Edit profile</a>
          , <a href="#" onClick={onSignOut}>Sign out</a>)
        </p>
      </div>

    </div>
  )

}
