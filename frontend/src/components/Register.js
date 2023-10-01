import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onSubmit, isLoading }) {

  return (
    <div className="enter enter_t_sign-up" >
      <h1 className="enter__title">Регистрация</h1>
      <AuthForm onSubmit={onSubmit} isLoading={isLoading} autocomplete={"new-password"} buttonText={"Зарегистрироваться"} />
      <p className="enter__text">Уже зарегистрированы? <Link to="sign-in" className="enter__link">Войти</Link></p>
    </div >
  );
}

export default Register;