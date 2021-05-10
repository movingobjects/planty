
import * as React from 'react';
import { useHash } from 'react-use';

import Modal from '~/src/components/shared/Modal';

import style from './index.module.scss';

const EditPlantModal = ({

}) => {

  const [ hash, setHash ] = useHash();

  function cancel() {
    setHash(`#/`);
  }

  return (
    <Modal
      onEscKey={cancel}
      onClickOff={cancel}>
      <div className={style.wrap}>
        <h1>EditPlantModal</h1>
        <p>To do</p>
      </div>
    </Modal>
  );

}

export default EditPlantModal;
