import { useAtomValue } from 'jotai';
import { pick } from 'lodash';
import React, {
  useEffect,
  useState
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as atoms from 'atoms';

import Modal from 'components/shared/Modal';

import style from './index.module.scss';

const FIELDS = [
  'id',
  'name',
  'specieId',
  'dateBorn',
  'dateRetired',
  'image',
  'source',
  'roomId'
];

const EditPlantModal = ({
  onDelete = () => { },
  onSave = (data) => { }
}) => {
  const navigate = useNavigate();
  const { id: plantId } = useParams();

  const species = useAtomValue(atoms.species);
  const plants = useAtomValue(atoms.plants);
  const rooms = useAtomValue(atoms.rooms);

  const plant = plants.find((p) => p.id === plantId);

  const [formData, setFormData] = useState(pick(plant, ...FIELDS));

  const canSave = (
    !!formData?.name?.length &&
    !!formData?.specieId?.length
  );

  useEffect(() => {
    setFormData(pick(plant, ...FIELDS));
  }, [plant]);

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
  function onRoomIdChange(e) {
    setFormData({
      ...formData,
      roomId: e.target.value
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

  function onDeleteClick(e) {
    if (canSave) {
      onDelete(plant.id);
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
    navigate('/plants');
  }

  if (!plant) {
    return null;
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Edit Plant</h2>

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
            htmlFor="specieId">
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
            htmlFor="source">
            Source
          </label>
          <input
            name="source"
            value={formData.source || ''}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor="dateBorn">
            Date born
          </label>
          <input
            name="dateBorn"
            value={formData.dateBorn || ''}
            onChange={onInputChange} />
        </p>

        <p>
          <label
            htmlFor="dateRetired">
            Date retired
          </label>
          <input
            name="dateRetired"
            value={formData.dateRetired || ''}
            onChange={onInputChange} />
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

        <p>
          <label
            htmlFor="roomId">
            Room
          </label>
          <select
            name="roomId"
            value={formData.roomId || ''}
            onChange={onRoomIdChange}>
            {rooms.map((r) => (
              <option
                key={r.id}
                value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
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
  );
};

export default EditPlantModal;