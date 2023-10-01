import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: values['card-title'], link: values['card-link'] });
  };

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    };
  }, [isOpen]);

  return (
    <PopupWithForm name='add' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid}>
      <fieldset className="popup__row">
        <input type="text" name="card-title" id="card-title" className="popup__input" placeholder="Название" required
          noValidate minLength="2" maxLength="30" onChange={handleChange} value={values['card-title'] ? values['card-title'] : ''} />
        {errors['card-title'] && <span className="popup__error">{errors['card-title']}</span>}
      </fieldset>
      <fieldset className="popup__row">
        <input type="url" name="card-link" id="card-link" className="popup__input" placeholder="Ссылка на картинку"
          required noValidate onChange={handleChange} value={values['card-link'] ? values['card-link'] : ''} />
        {errors['card-link'] && <span className="popup__error">{errors['card-link']}</span>}
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;