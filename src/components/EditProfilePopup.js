import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit_profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen ? 'popup_opened' : 'no-open'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLoading={props.onLoading}
    >
      <input
        type="text"
        name="popupInputName"
        className="popup__form-input popup__text popup__text_input_name"
        id="popup-input-name"
        minLength="2"
        maxLength="40"
        value={name ?? ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__form-error popup-input-name-error"></span>
      <input
        type="text"
        name="popupInputJob"
        className="popup__form-input popup__text popup__text_input_job"
        id="popup-input-job"
        minLength="2"
        maxLength="200"
        value={description ?? ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__form-error popup-input-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
