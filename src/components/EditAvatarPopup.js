import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = '';
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="change_avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen ? 'popup_opened' : 'no-open'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLoading={props.onLoading}
    >
      <input
        type="url"
        name="popupInputAvatar"
        className="popup__form-input popup__text popup__text_input_avatar"
        id="popup-input-avatar"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span className="popup__form-error popup-input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
