import React  from "react";
import {reduxForm,Field,SubmissionError} from 'redux-form'
import axios from 'axios'
import Cookies from "js-cookie";


const renderError=({error,touched})=>{
    if(error && touched){
        return(
            <div>

                {error}
            </div>
        )
    }
}
const renderInput = ({label,input,meta})=>{
    return(
        <div>
            <label>{label}</label>
            <input {...input} autoComplete ='off' /> 
            {renderError(meta)}           
        </div>
        
    )
}



const onSubmitRegister=(formValues)=>{
   
    console.log(formValues)
    console.log(formValues.email)
    
    axios.defaults.withCredentials = true
  
    return axios.post(
        "http://127.0.0.1:5000/register",
        {
        
        
        
            "email":formValues.email,
            "password":formValues.password
        }
        
        
    )
    .then(response => {
        console.log(response,'success')
        Cookies.set('email', formValues.email)
        window.location.href=('/')
    })
    .catch(error => {
        console.log(error,'fail register')
        throw new SubmissionError({
            password: 'Email exists already',
            
        })
        
    })
   
     
    
}

const validate = formValues =>{
    const errors = {}

    if (!formValues.email){
        errors.email="enter email please"
    }
    if (!formValues.password){
        errors.password="enter password please"
    }
 
    return errors
}
const FormInputs =({handleSubmit,valid,pristine, reset,submitting }) =>{
    
    return(
        <div className="auth_form">
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <Field name='email' component={renderInput} label='Email: '  />
                <Field name='password' component={renderInput} label='Password: '  />
                <button  className = "button-7" disabled={!valid}> Register</button>
                <button className = "button-1" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                
            </form>
         

        
        </div>
    )
}



export default reduxForm({
   form:'authFormRegister',
   destroyOnUnmount: false, 
   validate:validate

  
 })(FormInputs);