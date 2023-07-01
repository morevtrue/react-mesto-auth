function ImagePopup(props) {
  return (
    <section className={`popup popup_open_image ${props.card.isOpen ? 'popup_opened' : 'no-open'}`}>
      <div className="popup__content-image">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <figure className="popup__image-figure">
          <img src={props.card.link} alt={props.card.name} className="popup__image" />
          <figcaption className="popup__image-text">{props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
