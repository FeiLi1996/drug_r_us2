import React,{useState} from "react";
import AuthFormLogin from "../forms/auth_form_login";
import AuthFormRegister from "../forms/auth_form_register";
import { useSelector } from "react-redux";

export const LoginRegister =() => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  return (
    <div>
      <h1>DevCamp React Starter</h1>
      <h2>React Redux Router</h2>
      <div>LoginRegister</div> 
      
      {!isLogged?

      (
        <div>
          <AuthFormLogin />
          <AuthFormRegister />
        </div>
      )
      :
      (
          <div> You are logged in already. </div>
      )}


    </div>
  );
};