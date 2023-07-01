import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete_confirm"
      title="Вы уверены?"
      buttonName="Да"
      isOpen={props.isOpen ? 'popup_opened' : 'no-open'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLoading={props.onLoading}
    />
  );
}

export default DeleteCardPopup;
