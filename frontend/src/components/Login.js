import React from "react";
import AuthForm from "./AuthForm";

function Login({ onSubmit, isLoading }) {
  return (
    <div className="enter" >
      <h1 className="enter__title">Вход</h1>
      <AuthForm onSubmit={onSubmit} isLoading={isLoading} autocomplete={''} buttonText={'Войти'} />
    </div >
  );
}

export default Login;