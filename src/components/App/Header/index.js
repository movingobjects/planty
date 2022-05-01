import React, {
  useState,
  useContext
} from 'react';
import * as mutations from 'graphql/mutations';
import { API } from 'aws-amplify';

import style from './index.module.scss';

import { useStorage } from 'hooks/storage';
import { AppContext } from 'components/App';
import EditProfileModal from './EditProfileModal';

export default function Header({
  onSignOut = () => { }
}) {

  const { uploadFile } = useStorage();
  const { user } = useContext(AppContext);
  const [ editModalOn, setEditModalOn ] = useState(false);

  function onEditProfileClick() {
    setEditModalOn(true);
  }

  function getUserImagePath(file, userId) {
    const timestamp = Date.now(),
          ext       = file?.name?.split('.').pop();
    return `users/${userId}/${timestamp}.${ext}`;
  }

  async function onSaveProfile(userData) {

    const hasNewImage = !!userData?.profileImg?.name?.length;

    if (hasNewImage) {
      userData.profileImg = await uploadFile(
        userData?.profileImg,
        getUserImagePath(userData?.profileImg, userData?.id)
      );
    }

    await API.graphql({
      query: mutations.updateUser,
      variables: {
        input: userData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
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
        <div className={style.wrapProfileImg}>
          {!!user?.profileImg?.length && (
            <img
              alt={user?.firstName}
              src={user?.profileImg} />
            )}
          </div>
        <p>Hello {user?.firstName}</p>
        <p>
          <span onClick={onEditProfileClick}>Edit profile</span>
          <span onClick={onSignOut}>Sign out</span>
        </p>
      </div>

    </div>
  )

}
