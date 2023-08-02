import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import React from 'react';
import { api } from '../utils/api.js';
import { apiAuth } from '../utils/apiAuth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopup, setIsDeleteCardPopup] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    isOpen: false
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isErrorRegister, setIsErrorRegister] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('');

  const textAccept = 'Вы успешно зарегистрировались!';
  const textError = 'Что-то пошло не так! Попробуйте ещё раз.';

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInitialCards(), api.getProfileContent()])
        .then(([cards, info]) => {
          setCards(cards);
          setCurrentUser(info);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tokenCheck = () => {
    // if (localStorage.getItem('jwt')) {
    // const jwt = localStorage.getItem('jwt');
    apiAuth
      .checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/", { replace: true });
          setHeaderEmail(res.email);
        } else {
          setIsLoggedIn(false)
        }

      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err)
      });
    // }
  };

  const handleClearCookie = () => {
    apiAuth
      .clearCookie()
      .then((res) => {
        setIsLoggedIn(false);
        navigate('/sign-in');
        setHeaderEmail('');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopup(card);
  }

  function handleRegisterPopupClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
      isOpen: true
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => {
      return i === currentUser._id;
    });
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(isDeleteCardPopup._id)
      .then(() => {
        setCards(cards => cards.filter(card => card._id !== isDeleteCardPopup._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(profileData) {
    setIsLoading(true);
    api
      .submitProfileData(profileData)
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .submitEditAvatar(avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmitRegister(password, email) {
    setIsErrorRegister(false);
    apiAuth
      .register(password, email)
      .then(() => {
        navigate("/sign-in", { replace: true });
        handleRegisterPopupClick();
      })
      .catch(err => {
        handleRegisterPopupClick();
        setIsErrorRegister(true);
        console.log(err);
      })
  }

  function handleSubmitAuth(password, email) {
    apiAuth
      .authorization(password, email)
      .then((res) => {
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        setHeaderEmail(email);
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const closePopupEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeAllPopups(evt);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      name: '',
      link: '',
      isOpen: false
    });
    setIsDeleteCardPopup(false);
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onKeyDown={closePopupEsc}>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                onSubmit={handleSubmitRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onSubmit={handleSubmitAuth}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                onLogoutProfile={handleClearCookie}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                card={cards}
                email={headerEmail}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : <Navigate to="/sign-in" replace />
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopup}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isError={isErrorRegister}
          textAccept={textAccept}
          textError={textError}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
