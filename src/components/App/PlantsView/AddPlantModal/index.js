import { useAtomValue } from 'jotai';
import moment from 'moment';
import React, {

  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

import * as atoms from 'atoms';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const AddPlantModal = ({
  onAdd = (data) => { }
}) => {
  const navigate = useNavigate();

  const user = useAtomValue(atoms.user);
  const species = useAtomValue(atoms.species);

  const emptyFormState = {
    name: '',
    specieId: species?.[0]?.id || '',
    userId: user?.id,
    dateNextWater: moment().format('YYYY-MM-DD'),
    waterings: []
  };

  const [formData, setFormData] = useState(emptyFormState);

  const canAdd = (
    !!formData?.name?.length &&
    !!formData?.specieId?.length
  );

  function onInputChange(e) {
    const field = e?.target?.name;
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });
  }
  function onSpecieIdChange(e) {
    setFormData({
      ...formData,
      specieId: e.target.value
    });
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
      onClose();
    }
  }
  function onClose() {
    navigate('/plants');
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Add Plant</h2>

        <p>
          <label
            htmlFor="name">
            Name
          </label>
          <input
            name="name"
            value={formData.name || ''}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor="specie">
            Specie
          </label>
          <select
            name="specieId"
            value={formData.specieId || ''}
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
            htmlFor="image">
            Image
          </label>
          <input
            name="image"
            type="file"
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
  );
};

export default AddPlantModal;