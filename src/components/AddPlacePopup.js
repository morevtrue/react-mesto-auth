import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleAddName(evt) {
    setName(evt.target.value);
  }

  function handleAddLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name,
      link: link
    });
  }

  return (
    <PopupWithForm
      name="add_card"
      title="Новое место"
      buttonName="Создать"
      isOpen={props.isOpen ? 'popup_opened' : 'no-open'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLoading={props.onLoading}
    >
      <input
        type="text"
        name="popupInputPlace"
        className="popup__form-input popup__text popup__text_input_place"
        id="popup-input-place"
        placeholder="Название"
        value={name}
        onChange={handleAddName}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__form-error popup-input-place-error"></span>
      <input
        type="url"
        name="popupInputSrc"
        id="popup-input-src"
        className="popup__form-input popup__text popup__text_input_src"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleAddLink}
        required
      />
      <span className="popup__form-error popup-input-src-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
