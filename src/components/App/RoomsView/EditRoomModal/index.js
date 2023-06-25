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
  'level'
];

const EditRoomModal = ({
  onDelete = () => { },
  onSave = (data) => { }
}) => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();

  const rooms = useAtomValue(atoms.rooms);

  const room = rooms.find((s) => s.id === roomId);

  const [formData, setFormData] = useState(pick(room, ...FIELDS));

  const canSave = (
    !!formData?.name?.length
  );

  useEffect(() => {
    setFormData(pick(room, ...FIELDS));
  }, [room]);

  function onInputChange(e) {
    const field = e?.target?.name;
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });
  }

  function onDeleteClick(e) {
    if (canSave) {
      onDelete(room.id);
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
    navigate('/rooms');
  }

  return (
    <Modal
      onEscKey={onClose}
      onClickOff={onClose}>

      <div className={style.wrap}>

        <h2>Edit Room</h2>

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
            htmlFor="level">
            Level
          </label>
          <input
            name="level"
            type="number"
            value={formData.level || 0}
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
  );
};

export default EditRoomModal;