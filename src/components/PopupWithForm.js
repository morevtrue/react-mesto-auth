function PopupWithForm(props) {

  const closePopupOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <section className={`popup popup_${props.name} ${props.isOpen}`} onClick={closePopupOverlay}>
      <div
        className={`popup__container ${(props.name === 'change_avatar' && 'popup__container_type_avatar') ||
          (props.name === 'delete_confirm' ? 'popup__container_type_confirm' : '')
          }`}
      >
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button" disabled={props.onLoading}>
            {props.onLoading ? 'Сохранение...' : props.buttonName}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
