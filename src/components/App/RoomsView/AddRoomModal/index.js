import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EMPTY_FORM_STATE = {
  name: '',
  level: 0
}

export default function AddRoomModal({
  onAdd = (data) => { }
}) {

  const navigate = useNavigate();
  const [ formData, setFormData ] = useState(EMPTY_FORM_STATE);

  const canAdd = (
    !!formData?.name?.length
  )

  function onInputChange(e) {

    const field = e?.target?.name,
          value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });

  }

  function onAddClick(e) {
    if (canAdd) {
      onAdd(formData);
      onClose();
    }
  }
  function onClose() {
    navigate('/rooms')
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Add Room</h2>

        <p>
          <label
            htmlFor='name'>
            Name
          </label>
          <input
            name='name'
            value={formData.name || ''}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor='level'>
            Level
          </label>
          <input
            name='level'
            type='number'
            value={formData.level || 0}
            onChange={onInputChange} />
        </p>

        <hr />

        <p>
          <button
            disabled={!canAdd}
            onClick={onAddClick}>
            Add Room
          </button>
        </p>

      </div>

    </Modal>
  )

}
