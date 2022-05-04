import React, { useState, useContext } from 'react';
import { pick } from 'lodash';
import { API } from 'aws-amplify';

import * as mutations from 'graphql/mutations';
import { AppContext } from 'components/App';
import { useStorage } from 'hooks/storage';

import style from './index.module.scss';

const FIELDS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'profileImg'
];

export default function EditProfileView({
  onSave = (data) => { }
}) {

  const { user } = useContext(AppContext);
  const { uploadFile } = useStorage();

  const [ formData, setFormData ] = useState(pick(user, ...FIELDS));

  const hasChanges = FIELDS.some((f) => user[f] !== formData[f]);
  const isValid    = (
    !!formData?.email?.length &&
    !!formData?.firstName?.length
  );
  const canSave = isValid && hasChanges;

  function onInputChange(e) {

    const field = e?.target?.name,
          value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });

  }

  function onSaveClick(e) {
    if (canSave) {
      onSave(formData);
    }
  }

  function onImageSelect(e) {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profileImg: file
      });
    }
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

      <h2>Edit profile</h2>

      <p>
        <label
          htmlFor='firstName'>
          First name
        </label>
        <input
          name='firstName'
          value={formData.firstName || ''}
          onChange={onInputChange} />
      </p>

      <p>
        <label
          htmlFor='lastName'>
          Last name
        </label>
        <input
          name='lastName'
          value={formData.lastName || ''}
          onChange={onInputChange} />
      </p>

      <p>
        <label
          htmlFor='image'>
          Profile image
        </label>
        <input
          name='image'
          type='file'
          onChange={onImageSelect} />
      </p>

      <hr />

      <p>
        <button
          disabled={!canSave}
          onClick={onSaveClick}>
          Save changes
        </button>
      </p>

    </div>

  )

}
