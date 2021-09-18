
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

const EditPlantModal = ({
  plantId
}) => {

  const userId = useSelector((state) => state.userId);
  const species = useSelector((state) => state.species);
  const plants = useSelector((state) => state.plants);

  const { closeModal } = useCloseModal();
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
  function onDeleteClick() {

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .remove();

    closeModal();

  }
  function onFileSelect(e) {

    const file = e.target?.files?.[0];

    if (file) {
      uploadFile(file)
    }

  }

  function updateEditingPlant(field, value) {

    if (!field) return;

    setEditingPlant((state) => ({
      ...state,
      [field]: value
    }));

  }

  function uploadFile(file) {

    const storageRef = firebase.storage().ref();

    const timestamp = moment().format('YYYY-MM-DD');
    const folder    = `users/${userId}/plants/${plantId}`;
    const filename  = `${timestamp}-${file.name}`;
    const path  = `${folder}/${filename}`;

    const uploadTask = storageRef
      .child(path)
      .put(file, {
        contentType: 'image/jpeg'
      });

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,

      // Progress
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },

      // Error
      (error) => {
        console.log(`Error uploading file '${path}'`);
        console.log(error.code);
      },

      // Upload complete
      () => {

        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            setEditingPlant((state) => ({
              ...state,
              image: url
            }))
          });

      });

  }

  function cancel() {
    closeModal();
  }
  function save() {

    if (!canSave) return;

    firebase.database()
      .ref(`users/${userId}/plants/${plantId}`)
      .update({
        ...editingPlant
      });

    closeModal();

  }

  return (
    <Modal
      onEscKey={cancel}
      onClickOff={cancel}>
      <div className={style.wrap}>

        <h1>Edit Plant</h1>

        {editingPlant && (
          <div className={style.wrapForm}>

            {!!editingPlant?.image?.length && (
              <p className={style.image}>
                <img
                  src={editingPlant?.image} />
              </p>
            )}

            <p>
              <label
                className={style.upload}
                htmlFor='upload'>
                Upload image
              </label>
              <input
                id='upload'
                type='file'
                onChange={onFileSelect} />
            </p>

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
                htmlFor='dateBorn'>
                Birth date
              </label>
              <input
                type='date'
                name='dateBorn'
                value={editingPlant?.dateBorn || ''}
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
                value={editingPlant?.source || ''}
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

}

export default EditPlantModal;
