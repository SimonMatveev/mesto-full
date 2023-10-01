import useFormAndValidation from "../hooks/useFormAndValidation";

export default function AuthForm({ isLoading, onSubmit, autocomplete, buttonText }) {

  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  };

  return (
    <form action="#" name='enter-form' className="enter__form" onSubmit={handleSubmit} disabled={!isValid || isLoading} >
      <fieldset className="enter__row">
        <input type="email" name="email" id="email" className="enter__input" placeholder="Email" required noValidate
          minLength="2" maxLength="40" onChange={handleChange} value={values.email ? values.email : ''} />
        {errors.email && <span className="enter__error">{errors.email}</span>}
      </fieldset>
      <fieldset className="enter__row">
        <input type="password" name="password" id="password" className="enter__input" placeholder="Пароль" required noValidate
          minLength="2" maxLength="40" onChange={handleChange} value={values.password ? values.password : ''} autoComplete={autocomplete} />
        {errors.password && <span className="enter__error">{errors.password}</span>}
      </fieldset>
      <button className={`enter__btn${!isValid || isLoading ? ' enter__btn_disabled' : ''}`} type="submit" >{!isLoading ? buttonText : "Загрузка..."}</button>
    </form>
  )
}