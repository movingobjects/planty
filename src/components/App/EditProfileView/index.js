import { useAtomValue } from 'jotai';
import { pick } from 'lodash';
import React, {
  useEffect,
  useState
} from 'react';

import * as atoms from 'atoms';
import useApi from 'hooks/useApi';

import style from './index.module.scss';

const FIELDS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'profileImg'
];

const EditProfileView = () => {
  const user = useAtomValue(atoms.user);

  const { updateUser } = useApi();

  const [formData, setFormData] = useState(pick(user, ...FIELDS));

  const hasChanges = FIELDS.some((f) => user?.[f] !== formData?.[f]);
  const isValid = (
    !!formData?.email?.length &&
    !!formData?.firstName?.length
  );
  const canSave = isValid && hasChanges;

  useEffect(() => {
    setFormData(pick(user, ...FIELDS));
  }, [user]);

  function onInputChange(e) {
    const field = e?.target?.name;
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [field]: value
    });
  }

  function onSaveClick(e) {
    if (canSave) {
      updateUser(formData);
    }
  }

  function onImageSelect(e) {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profileImg: file
      });
    }
  }

  return (

    <div className={style.wrap}>

      <h2>Edit profile</h2>

      <p>
        <label
          htmlFor="firstName">
          First name
        </label>
        <input
          name="firstName"
          value={formData.firstName || ''}
          onChange={onInputChange} />
      </p>

      <p>
        <label
          htmlFor="lastName">
          Last name
        </label>
        <input
          name="lastName"
          value={formData.lastName || ''}
          onChange={onInputChange} />
      </p>

      <p>
        <label
          htmlFor="image">
          Profile image
        </label>
        <input
          name="image"
          type="file"
          onChange={onImageSelect} />
      </p>

      <hr />

      <p>
        <button
          disabled={!canSave}
          onClick={onSaveClick}>
          Save changes
        </button>
      </p>

    </div>

  );
};

export default EditProfileView;