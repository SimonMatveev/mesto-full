import React from 'react';
import Card from './Card';
import currentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, onComponentMount, cards }) {
  const currentUser = React.useContext(currentUserContext);

  React.useEffect(() => {
    onComponentMount();
  }, [])

  return (
    <main className="content">
      <section className="profile container">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser && currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__title-container">
          <h1 className="profile__title">{currentUser && currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          <p className="profile__text">{currentUser && currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фотографию" onClick={onAddPlace}></button>
      </section>
      <section className="photo-grid container" aria-label="Фото галлерея">
        {Array.from(cards).map(card => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;

