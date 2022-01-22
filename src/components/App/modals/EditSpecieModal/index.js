
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/storage';
import { times, isEqual } from 'lodash';
import moment from 'moment';

import config from '~/src/config';
import { useCloseModal } from '~/src/hooks/modals';
import Modal from '~/src/components/shared/Modal';

import * as style from './index.module.scss';

const EditSpecieModal = ({
  specieId
}) => {

  const userId = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);

  const { closeModal } = useCloseModal();
  const [ editingSpecie, setEditingSpecie ] = useState(null);

  const specie      = species.find((s) => s.id === specieId);
  const hasChanged  = !isEqual(editingSpecie, specie);
  const fieldsValid = true; // TODO
  const canSave     = hasChanged && fieldsValid;

  useEffect(() => {

    if (!!specie?.id?.length) {
      setEditingSpecie({ ...specie })
    }

  }, [ specieId, species ]);

  function onFieldChange(e) {

    const {
      name: field,
      value
    } = e.target || { };

    updateEditingSpecie(field, value);

  }
  function onDeleteClick() {

    firebase.database()
      .ref(`users/${userId}/species/${specieId}`)
      .remove();

    closeModal();

  }

  function updateEditingSpecie(field, value) {

    if (!field) return;

    setEditingSpecie((state) => ({
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
      .ref(`users/${userId}/species/${specieId}`)
      .update({
        ...editingSpecie
      });

    closeModal();

  }

  return (
    <Modal
      onEscKey={cancel}
      onClickOff={cancel}>
      <div className={style.wrap}>

        <h1>Edit Specie</h1>

        {editingSpecie && (
          <div className={style.wrapForm}>

            <pre>{JSON.stringify(specie, null, 2)}</pre>

            <p>
              <label
                htmlFor='commonName'>
                Common Name
              </label>
              <input
                type='text'
                name='commonName'
                value={editingSpecie?.commonName || ''}
                onChange={onFieldChange} />
            </p>

            <p>
              <label
                htmlFor='scientificName'>
                Scientific Name
              </label>
              <input
                type='text'
                name='scientificName'
                value={editingSpecie?.scientificName || ''}
                onChange={onFieldChange} />
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

  /*

            <p>
              <label
                htmlFor='nickname'>
                Nickname
              </label>
              <input
                type='text'
                name='nickname'
                value={editingSpecie?.nickname}
                onChange={onFieldChange} />
            </p>

            <p>
              <label
                htmlFor='specie'>
                Specie
              </label>
              <select
                name='specie'
                value={editingSpecie?.specie}
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
                htmlFor='dateBorn'>
                Birth date
              </label>
              <input
                type='date'
                name='dateBorn'
                value={editingSpecie?.dateBorn || ''}
                onChange={onFieldChange} />
            </p>

            <p>
              <label
                htmlFor='source'>
                Source
              </label>
              <input
                type='text'
                name='source'
                value={editingSpecie?.source || ''}
                onChange={onFieldChange} />
            </p>
  */

}

export default EditSpecieModal;
