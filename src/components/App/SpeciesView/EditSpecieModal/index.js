import React, { useState } from 'react';
import { pick } from 'lodash';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EDITABLE_FIELDS = [
  'id',
  'commonName',
  'scientificName'
]

export default function EditSpecieModal({
  specie = { },
  onClose = () => { },
  onDelete = () => { },
  onEdit = (data) => { }
}) {

  const [ formData, setFormData ] = useState(pick(specie, ...EDITABLE_FIELDS));

  const canSave = (
    !!formData?.commonName?.length &&
    !!formData?.scientificName?.length
  );

  function onInputChange(e) {

    const field = e?.target?.name,
          value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });

  }

  function onDeleteClick(e) {
    if (canSave) {
      onDelete(specie.id);
      onClose();
    }
  }
  function onSaveClick(e) {
    if (canSave) {
      onEdit(formData);
      onClose();
    }
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Edit Specie</h2>

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
            onClick={onDeleteClick}>
            Delete
          </button>
        </p>

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
