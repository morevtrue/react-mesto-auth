function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen}`}>
      <div
        className={`popup__container ${
          (props.name === 'change_avatar' && 'popup__container_type_avatar') ||
          (props.name === 'delete_confirm' ? 'popup__container_type_confirm' : '')
        }`}
      >
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
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
