import React, { useState } from 'react';

import {
  createPlant as createPlantMutation,
  deletePlant as deletePlantMutation
} from 'graphql/mutations';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EMPTY_FORM_STATE = {
  name: ''
}

const AddPlantModal = ({
  onCancel = () => { },
  onAdd = (data) => { }
}) => {

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
  function onFileSelect(e) {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
    }
  }

  function onAddClick(e) {
    if (canAdd) {
      onAdd(formData);
      setFormData(EMPTY_FORM_STATE);
    }
  }

  return (
    <Modal
      onEscKey={onCancel}
      onClickOff={onCancel}>

      <div className={style.wrap}>

        <h2>Add Plant</h2>

        <input
          name='name'
          placeholder='Plant name'
          value={formData.name}
          onChange={onInputChange} />

        <input
          type='file'
          onChange={onFileSelect} />

        <button
          disabled={!canAdd}
          onClick={onAddClick}>
          Add Plant
        </button>

      </div>

    </Modal>
  )
}

export default AddPlantModal;
