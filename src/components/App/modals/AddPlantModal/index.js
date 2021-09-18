
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '@firebase/app';
import { times } from 'lodash';
import shortid from 'shortid';

import { useCloseModal } from '~/src/hooks/modals';
import Modal from '~/src/components/shared/Modal';

import * as style from './index.module.scss';

const AddPlantModal = () => {

  const userId = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);

  const { closeModal } = useCloseModal();
  const [ editingPlant, setEditingPlant ] = useState({
    nickname: ''
  });

  const fieldsValid = (
    !!editingPlant?.nickname?.length &&
    !!editingPlant?.specie?.length
  );
  const canSave = fieldsValid;

  useEffect(() => {

    setEditingPlant((state) => ({
      ...state,
      specie: species[0]?.id
    }))

  }, [ species ]);

  function onFieldChange(e) {

    const {
      name: field,
      value
    } = e.target || { };

    updateEditingPlant(field, value);

  }

  function updateEditingPlant(field, value) {

    if (!field) return;

    setEditingPlant((state) => ({
      ...state,
      [field]: value
    }));

  }

  function cancel() {
    closeModal();
  }
  function save() {

    if (!canSave) return;

    firebase.database()
      .ref(`users/${userId}/plants`)
      .push({
        ...editingPlant,
        wateringHistory: []
      });

    closeModal();

  }

  return (
    <Modal
      onEscKey={cancel}
      onClickOff={cancel}>
      <div className={style.wrap}>
        <h1>Add Plant</h1>

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

        </div>

        <footer>
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

export default AddPlantModal;
