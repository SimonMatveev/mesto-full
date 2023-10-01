function ImagePopup({ card, onClose }) {
  return (
    <div className={"popup popup_background_dark" + (card ? " popup_opened" : "")} id="image-popup">
      <figure className="popup__image-container">
        <button className="popup__close" type="button" aria-label="Закрыть изображение" onClick={onClose}></button>
        <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__image" />
        <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;