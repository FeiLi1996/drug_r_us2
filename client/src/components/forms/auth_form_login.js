import React from "react";
import {reduxForm,Field,SubmissionError } from 'redux-form'
import Cookies from 'js-cookie'
import axios from 'axios'



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

const onSubmitLogin=(formValues)=>{



    axios.defaults.withCredentials = true
   
    return axios.post(
        "http://127.0.0.1:5000/login",
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
    .catch(  error => {
        console.log(error,'fail login')
        throw  new SubmissionError({
            password: 'Wrong password or email',
        
        })


    })

    return
    
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
const FormInputs =({handleSubmit,valid,reset,pristine,submitting }) =>{
    
    return(
        <div className="login_form">
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <Field name='email' component={renderInput} label='Email: '  />
                <Field name='password' component={renderInput} label='Password: '  />
               
                <button className = "button-7" disabled={!valid} > Log in</button>
                <button className = "button-1" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </form>
           

        
        </div>
    )
}



export default reduxForm({
   form:'authFormLogin',
   destroyOnUnmount: false, 
   validate:validate

  
 })(FormInputs);