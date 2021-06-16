
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { useHash } from 'react-use';
import { times, isEqual } from 'lodash';

import Modal from '~/src/components/shared/Modal';

import style from './index.module.scss';

const EditPlantModal = ({
  plantId
}) => {

  const userId = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);
  const plants = useSelector((state) => state.plants);

  const [ hash, setHash ] = useHash();
  const [ editingPlant, setEditingPlant ] = useState(null);

  const plant       = plants.find((p) => p.id === plantId);
  const hasChanged  = !isEqual(editingPlant, plant);
  const fieldsValid = (
    !!editingPlant?.nickname?.length &&
    !!editingPlant?.specie?.length
  );
  const canSave     = hasChanged && fieldsValid;

  useEffect(() => {

    if (!!plant?.id?.length) {
      setEditingPlant({
        ...plant
      })
    }

  }, [ plantId, plants ]);

  function onFieldChange(e) {

    const {
      name: field,
      value
    } = e.target || { };

    updateEditingPlant(field, value);

  }
  function onIconIndexSelect(e) {
    updateEditingPlant('iconIndex', +(e.target.value));
  }
  function onDeleteClick() {

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .remove();

    close();

  }

  function updateEditingPlant(field, value) {

    if (!field) return;

    setEditingPlant((state) => ({
      ...state,
      [field]: value
    }));

  }

  function cancel() {
    close();
  }
  function save() {

    if (!canSave) return;

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        ...editingPlant
      });

    close();

  }
  function close() {
    setHash(`#/`);
  }

  return (
    <Modal
      onEscKey={cancel}
      onClickOff={cancel}>
      <div className={style.wrap}>

        <h1>Edit Plant</h1>

        {editingPlant && (
          <div className={style.wrapForm}>

            <p>
              <label
                htmlFor='nickname'>
                Nickname
              </label>
              <input
                type='text'
                name='nickname'
                value={editingPlant?.nickname}
                onChange={onFieldChange} />
            </p>

            <p>
              <label
                htmlFor='specie'>
                Specie
              </label>
              <select
                name='specie'
                value={editingPlant?.specie}
                onChange={onFieldChange}>
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
                htmlFor='iconIndex'>
                Icon
              </label>
              <select
                value={editingPlant?.iconIndex}
                onChange={onIconIndexSelect}>
                {times(50, (index) => (
                  <option
                    key={index}
                    value={index}>
                    Icon {index + 1}
                  </option>
                ))}
              </select>
            </p>

          </div>
        )}

        <footer>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={cancel}>Cancel</button>
          <button
            disabled={!canSave}
            onClick={save}>
            Save
          </button>
        </footer>

      </div>
    </Modal>
  );

}

export default EditPlantModal;
