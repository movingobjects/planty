import React, { useState } from 'react';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EMPTY_FORM_STATE = {
  commonName: '',
  scientificName: ''
}

const AddSpecieModal = ({
  onCancel = () => { },
  onAdd = (data) => { }
}) => {

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
    }
  }

  return (
    <Modal
      onEscKey={onCancel}
      onClickOff={onCancel}>

      <div className={style.wrap}>

        <h2>Add Specie</h2>

        <p>
          <input
            name='commonName'
            placeholder='Common name'
            value={formData.commonName}
            onChange={onInputChange} />
        </p>

        <p>
          <input
            name='scientificName'
            placeholder='Scientific name'
            value={formData.scientificName}
            onChange={onInputChange} />
        </p>

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

export default AddSpecieModal;
