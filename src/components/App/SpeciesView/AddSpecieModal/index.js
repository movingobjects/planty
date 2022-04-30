import React, { useState } from 'react';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EMPTY_FORM_STATE = {
  commonName: '',
  scientificName: ''
}

export default function AddSpecieModal({
  onClose = () => { },
  onAdd = (data) => { }
}) {

  const [ formData, setFormData ] = useState(EMPTY_FORM_STATE);

  const canAdd = (
    !!formData?.commonName?.length &&
    !!formData?.scientificName?.length
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
      setFormData(EMPTY_FORM_STATE);
      onClose();
    }
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Add Specie</h2>

        <p>
          <label
            htmlFor='commonName'>
            Common name
          </label>
          <input
            name='commonName'
            value={formData.commonName}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor='scientificName'>
            Scientific name
          </label>
          <input
            name='scientificName'
            value={formData.scientificName}
            onChange={onInputChange} />
        </p>

        <hr />

        <p>
          <button
            disabled={!canAdd}
            onClick={onAddClick}>
            Add Specie
          </button>
        </p>

      </div>

    </Modal>
  )

}
