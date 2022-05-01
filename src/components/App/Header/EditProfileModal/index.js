import React, { useState } from 'react';
import { pick } from 'lodash';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EDITABLE_FIELDS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'profileImg'
];

export default function EditProfileModal({
  user = { },
  onClose = () => { },
  onSave = (data) => { }
}) {

  const [ formData, setFormData ] = useState(pick(user, ...EDITABLE_FIELDS));

  const canSave = (
    !!formData?.email?.length &&
    !!formData?.firstName?.length
  );

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
      onClose();
    }
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Edit User</h2>

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

        {/* <p>
          <label
            htmlFor='image'>
            Image
          </label>
          <input
            name='image'
            type='file'
            onChange={onImageSelect} />
        </p> */}

        <hr />

        <p>
          <button
            disabled={!canSave}
            onClick={onSaveClick}>
            Save changes
          </button>
        </p>

      </div>

    </Modal>
  )

}
