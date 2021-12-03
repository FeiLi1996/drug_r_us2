import React from "react";
import AuthFormLogin from "../forms/auth_form_login";
import AuthFormRegister from "../forms/auth_form_register";
import { useSelector } from "react-redux";

export const LoginRegister =() => {

  const isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  return (
    <div className="login_register_wrapper_overall">

      
      {!isLogged?

      (
        <div className="login_register_wrapper">
          <AuthFormLogin />
          <AuthFormRegister />
        </div>
      )
      :
      (
          <div className="error_message"> You are logged in already. </div>
      )}


    </div>
  );
};