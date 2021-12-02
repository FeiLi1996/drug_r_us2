import React,{useState} from "react";
import AuthFormLogin from "../forms/auth_form_login";
import AuthFormRegister from "../forms/auth_form_register";
import TestLogin from "../forms/test_login";

export const LoginRegister =() => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <h1>DevCamp React Starter</h1>
      <h2>React Redux Router</h2>
      <div>LoginRegister</div> 
      
      <AuthFormLogin />
      <AuthFormRegister />
      {/* <TestLogin /> */}


    </div>
  );
};