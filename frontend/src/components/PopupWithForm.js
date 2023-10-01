import React from "react";
function PopupWithForm({ name, title, isOpen, onClose, onSubmit, isLoading, isValid, ...props }) {
  return (
    <div className={"popup" + (isOpen ? " popup_opened" : "")} id={name + '-popup'}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close" type="button" aria-label="Закрыть попап" onClick={onClose} />
        <form action="#" name={name + '-popup-form'} className="popup__form" onSubmit={onSubmit}>
          {props.children}
          <button className={`popup__btn${(!isValid || isLoading) ? ' popup__btn_disabled' : ''}`} type="submit" disabled={!isValid || isLoading} >{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;