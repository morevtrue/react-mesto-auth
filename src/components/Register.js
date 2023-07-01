import React from "react";
import Header from "./Header.js";
import { Link } from "react-router-dom";

function Register(props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(password, email);
  }

  return (
    <>
      <Header>
        <ul className="header__content">
          <li>
            <Link to="/sign-in" className="header__button header__button_type_auth">
              Войти
            </Link>
          </li>
        </ul>
      </Header>
      <section className="register">
        <div className="register__container">
          <h2 className="register__title">Регистрация</h2>
          <form className="register__form" onSubmit={handleSubmit} name="registerForm">
            <input
              type="email"
              name="registerInputEmail"
              className="register__form-input register__text register__text_input_email"
              id="register-input-email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <input
              type="password"
              name="registerInputPassword"
              className="register__form-input register__text register__text_input_password"
              id="register-input-password"
              minLength="6"
              maxLength="200"
              placeholder="Пароль"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <button type="submit" className="register__submit-button">
              Зарегистрироваться
            </button>
          </form>
          <Link to="/sign-in" className="register__link">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </section>
    </>
  );
}

export default Register;
