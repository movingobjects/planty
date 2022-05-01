import React, {
  useState,
  useContext
} from 'react';
import { pick } from 'lodash';

import { AppContext } from 'components/App';
import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const EDITABLE_FIELDS = [
  'id',
  'name',
  'specieId',
  'dateBorn',
  'dateRetired',
  'image',
  'source'
]

export default function EditPlantModal({
  plant = { },
  onClose = () => { },
  onDelete = () => { },
  onEdit = (data) => { }
}) {

  const { user, species } = useContext(AppContext);

  const [ formData, setFormData ] = useState(pick(plant, ...EDITABLE_FIELDS));

  const canSave = (
    !!formData?.name?.length &&
    !!formData?.specieId?.length
  );

  function onInputChange(e) {

    const field = e?.target?.name,
          value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });

  }
  function onSpecieIdChange(e) {

    setFormData({
      ...formData,
      specieId: e.target.value
    })

  }
  function onImageSelect(e) {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
    }
  }

  function onDeleteClick(e) {
    if (canSave) {
      onDelete(plant.id);
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

        <h2>Edit Plant</h2>

        <p>
          <label
            htmlFor='name'>
            Name
          </label>
          <input
            name='name'
            value={formData.name}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor='specie'>
            Specie
          </label>
          <select
            name='specieId'
            value={formData.specieId}
            onChange={onSpecieIdChange}>
            {species.map((s) => (
              <option
                key={s.id}
                value={s.id}>
                {s.commonName}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label
            htmlFor='image'>
            Image
          </label>
          <input
            name='image'
            type='file'
            onChange={onImageSelect} />
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
