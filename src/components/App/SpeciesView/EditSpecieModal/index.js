import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import { pick } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext } from 'components/App';
import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const FIELDS = [
  'id',
  'commonName',
  'scientificName'
]

export default function EditSpecieModal({
  onDelete = () => { },
  onSave = (data) => { }
}) {

  const navigate = useNavigate();
  const { species } = useContext(AppContext);
  const { id: specieId } = useParams();
  const specie = species.find((s) => s.id === specieId);

  const [ formData, setFormData ] = useState(pick(specie, ...FIELDS));

  const canSave = (
    !!formData?.commonName?.length &&
    !!formData?.scientificName?.length
  );

  useEffect(() => {
    setFormData(pick(specie, ...FIELDS));
  }, [ specie ]);

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
      onSave(formData);
      onClose();
    }
  }

  function onClose() {
    navigate('/species')
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
            value={formData.commonName || ''}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor='scientificName'>
            Scientific name
          </label>
          <input
            name='scientificName'
            value={formData.scientificName || ''}
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
