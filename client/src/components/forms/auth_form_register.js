import React  from "react";
import {reduxForm,Field} from 'redux-form'
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
    
    if(formValues.email ==='' || formValues.email===undefined){       
        console.log('fail email')     
    }
    else{


        axios.defaults.withCredentials = true
        axios
        .post(
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
            
        })


        
    }
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
const FormInputs =({handleSubmit,valid}) =>{
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <Field name='email' component={renderInput} label='email'  />
                <Field name='password' component={renderInput} label='password'  />
                <button disabled={!valid}> Register</button>
                
            </form>
            <div>hello</div>

        
        </div>
    )
}



export default reduxForm({
   form:'authFormRegister',
   destroyOnUnmount: false, 
   validate:validate

  
 })(FormInputs);