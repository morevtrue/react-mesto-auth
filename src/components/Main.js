import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isClickOnButton, setIsClickOnButton] = React.useState(false);
  const navigate = useNavigate();

  function handleMenuOpenClick() {
    setIsClickOnButton(true);
  }

  function handleMenuCloseClick() {
    setIsClickOnButton(false);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <>
      {isClickOnButton &&
        <ul className="header__content header__content_type_nav-menu">
          <li>
            <p className="header__email">{props.email}</p>
          </li>
          <li>
            <button onClick={signOut} className="header__button header__button_type_exit">
              Выйти
            </button>
          </li>
        </ul>
      }
      <Header>
        <ul className="header__content header__content_type_main-page">
          <li>
            <p className="header__email">{props.email}</p>
          </li>
          <li>
            <button onClick={signOut} className="header__button header__button_type_exit">
              Выйти
            </button>
          </li>
        </ul>
        {!isClickOnButton && <button className="header__nav-button" onClick={handleMenuOpenClick}></button>}
        {isClickOnButton && <button className="header__nav-button header__nav-button_type_close" onClick={handleMenuCloseClick}></button>}
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__place-avatar">
              <img alt="фотография профиля" src={currentUser.avatar} className="profile__avatar" />
              <button
                className="profile__avatar-button"
                type="button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__content">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={props.onEditProfile}
                ></button>
              </div>

              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
        </section>
        <section className="cards" aria-label="подборка фотографий интересных мест мира">
          <ul className="cards__list">
            {props.card.map(card => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>

  );
}

export default Main;
