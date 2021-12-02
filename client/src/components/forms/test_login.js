
import axios from 'axios';
import React from 'react'
import Cookies from 'js-cookie'
import { useSelector,useDispatch } from 'react-redux';


 const test_login=(prop)=>{
    function handleSubmit(event){
        event.preventDefault()
        console.log(event.target.email.value)
        console.log(event.target.password.value)
       // Cookies.set('ji','ji')
        axios.defaults.withCredentials = true
        //console.log(Cookies.get('ji'))
        
        axios.post(
            "http://127.0.0.1:5000/login",
            { 
            
            
            
                "email":event.target.email.value,
                "password":event.target.password.value
            }
            
            
        )
        .then(response => {
            console.log(response,'success')
            Cookies.set('ji','ji')
            // axios.get(
            //     "http://127.0.0.1:5000/me",
               
                
                
            // )
            // .then(response => {
            //     console.log(response,'success auth')
            
     
            // })
            // .catch(error => {
            //     console.log(error,'fail auth')
                
            // })
     
 
        })
        .catch(error => {
            console.log(error,'fail login')
            alert("failed login")
        })


  


      
        
    
    }


    return(

        <form onSubmit={(e)=>handleSubmit(e)} autoComplete ='off'>
            <div>
                <div>
                    <label>Email </label>
                    <input
                        type="text"
                        name='email'
                        placeholder="email"
                    />
               
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        name='password'
                        placeholder="password"
                    />
                </div>
          
                <button type="submit">Submit</button>
            </div>
        </form> 
    )
}

export default test_login