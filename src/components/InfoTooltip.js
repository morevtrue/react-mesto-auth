import imageAccept from '../images/union.svg';
import imageError from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <section className={
      props.isOpen ? `popup popup_open_info popup_opened`
        : `popup popup_open_info`
    } onClick={props.onClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img src={
          props.isError ? imageError
            : imageAccept
        } alt="удачная или не очень регистрация" className="popup__image-accept" />
        <h2 className="popup__accept-title">{
          props.isError ? props.textError
            : props.textAccept
        }</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
