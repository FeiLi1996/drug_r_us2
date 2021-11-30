import React  from "react";
import {reduxForm,Field} from 'redux-form'
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
   
    console.log(formValues)
    console.log(formValues.email)
    
    if(formValues.email ==='' || formValues.email===undefined){       
        console.log('fail email')     
    }
    else{



        axios
        .post(
            "http://127.0.0.1:5000/login",
            { withCredentials: true, 
            
            
                "email":formValues.email,
                "password":formValues.password
            }
            
            
        )
        .then(response => {
            console.log(response,'success')
        })
        .catch(error => {
            console.log(error,'fail login')
            
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
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <Field name='email' component={renderInput} label='email'  />
                <Field name='password' component={renderInput} label='password'  />
                <button disabled={!valid}> Log in</button>
                
            </form>
            <div>hello</div>

        
        </div>
    )
}



export default reduxForm({
   form:'authFormLogin',
   destroyOnUnmount: false, 
   validate:validate

  
 })(FormInputs);