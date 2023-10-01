import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext';
function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(currentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleCardDelete() {
    onCardDelete(card);
  };

  return (
    <div className="photo-grid__item">
      <img src={card.link} alt={card.name} className="photo-grid__image" onClick={handleClick} />
      {isOwn && <button className="photo-grid__item-delete" type="button" aria-label="Удалить карточку" onClick={handleCardDelete} />}
      <div className="photo-grid__caption">
        <h2 className="photo-grid__item-title">{card.name}</h2>
        <div className="photo-grid__card-like-container">
          <button className={`photo-grid__like-button${isLiked ? ' photo-grid__like-button_active' : ''}`} type="button" aria-label="Мне нравится" onClick={handleLikeClick}></button>
          <p className="photo-grid__like-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;