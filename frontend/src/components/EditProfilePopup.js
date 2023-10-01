import React from "react";
import PopupWithForm from "./PopupWithForm";
import currentUserContext from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = React.useContext(currentUserContext);
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    if (currentUser) {
      setValues({ ...values, name: currentUser.name, description: currentUser.about });
      setIsValid(true)
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  return (
    <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid}>
      <fieldset className="popup__row">
        <input type="text" name="name" id="name" className="popup__input" placeholder="Имя" required noValidate
          minLength="2" maxLength="40" onChange={handleChange} value={values.name ? values.name : ''} />
        {errors.name && <span className="popup__error">{errors.name}</span>}
      </fieldset><fieldset className="popup__row">
        <input type="text" name="description" id="description" className="popup__input" placeholder="О себе" required
          noValidate minLength="2" maxLength="200" onChange={handleChange} value={values.description ? values.description : ''} />
        {errors.description && <span className="popup__error">{errors.description}</span>}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;