import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values.avatar);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    };
  }, [isOpen]);

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid}>
      <fieldset className="popup__row">
        <input type="url" name="avatar" id="avatar" className="popup__input"
          placeholder="Ссылка на изображение" required noValidate value={values.avatar ? values.avatar : ''} onChange={handleChange} />
        {errors.avatar && <span className="popup__error">{errors.avatar}</span>}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;