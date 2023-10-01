import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { cardApi } from '../utils/cardApi';
import { authApi } from '../utils/authApi';
import currentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [tooltip, setTooltip] = React.useState({
    isOpened: false,
    isSuccess: false,
    text: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    cardApi.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    cardApi.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setTooltip({
      ...tooltip,
      isOpened: false
    });
    setSelectedCard(null);
  };

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    cardApi.setUserInfo(name, about)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.data.name,
          about: res.data.about
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    cardApi.updateAvatar(link)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          avatar: res.data.avatar
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit({ title, link }) {
    setIsLoading(true);
    cardApi.addCard(title, link)
      .then(newCard => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleRegistration(email, password) {
    setIsLoading(true);
    authApi.register(email, password)
      .then(() => {
        setTooltip({
          isOpened: true,
          isSuccess: true,
          text: 'Вы успешно зарегистрировались!'
        })
      })
      .catch(err => {
        setTooltip({
          isOpened: true,
          isSuccess: false,
          text: err
        })
      })
      .finally(() => setIsLoading(false));
  }

  function handleAuthorization(email, password) {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    authApi.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        setTooltip({
          isOpened: true,
          isSuccess: false,
          text: err
        })
      })
      .finally(() => setIsLoading(false));
  }

  function handleSignOut() {
    return authApi.logout()
      .then(() => setLoggedIn(false))
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    authApi.getContent()
      .then(() => {
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleMainMount() {
    Promise.all([cardApi.getUserInfo(), cardApi.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData.data);
        setCards(cardsData.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleMenuOpen = () => isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className={`page${isMenuOpen && (location?.pathname === '/') ? ' page_translated' : ''}`}>
        <Header onMenuClick={handleMenuOpen} onSignOut={handleSignOut} isOpen={isMenuOpen} email={currentUser ? currentUser.email : ''} />
        <Routes>
          <Route path='/*' element={isLoggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />} />
          <Route path='/' exact element={<>
            <ProtectedRouteElement
              element={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onComponentMount={handleMainMount} />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <PopupWithForm name='confirm' title='Вы уверены?' />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </>} />
          <Route path='/sign-in' element={<Login onSubmit={handleAuthorization} isLoading={isLoading} />} />
          <Route path='/sign-up' element={<Register onSubmit={handleRegistration} isLoading={isLoading} />} />
        </Routes>
        <InfoTooltip {...tooltip} onClose={closeAllPopups} />
      </div>
    </currentUserContext.Provider >
  );
}

export default App;
