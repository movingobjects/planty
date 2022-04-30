import React, {
  useState,
  useContext
} from 'react';

import { AppContext } from 'components/App';
import Modal from 'components/shared/Modal';

import style from './index.module.scss';

export default function AddPlantModal({
  onClose = () => { },
  onAdd = (data) => { }
}) {

  const { user, species } = useContext(AppContext);

  const emptyFormState = {
    name: '',
    specieId: species?.[0]?.id || '',
    userId: user?.username
  };

  const [ formData, setFormData ] = useState(emptyFormState);

  const canAdd = (
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

  function onAddClick(e) {
    if (canAdd) {
      onAdd(formData);
      setFormData(emptyFormState);
      onClose();
    }
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Add Plant</h2>

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
            disabled={!canAdd}
            onClick={onAddClick}>
            Add Plant
          </button>
        </p>

      </div>

    </Modal>
  )

}
