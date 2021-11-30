import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import axios from 'axios';





import {Buy} from './pages/buy';
import {ErrorPage} from './pages/error_page';
import {About} from './pages/about';
import {CheckInteractions} from './pages/check_interactions';
import {Checkout} from './pages/checkout';
import {ConfirmationPurchase} from './pages/confirmation_purchase';
import {LoginRegister} from './pages/login_register';
import {Sell} from './pages/sell';
import Userprofile from './pages/user_profile';
import {NavBar} from './navigation/navbar';
import { setUserProfile } from '../actions';



 const App  =()=>{
   const dispatch =useDispatch()
  useEffect(() => {
    axios
    .post(
        "http://127.0.0.1:5000/get_user_profile",
        { withCredentials: true,
          "user_email":"random5" 
        }
        
        
    )
    .then(response => {
      
      // response.data.map(eachProfile=>{
      //   console.log(eachProfile)
      // })
      Object.entries(response.data).map(profileAttribute => {
        
        dispatch(setUserProfile(profileAttribute))
      })
      
      

       
    })
    .catch(error => {
        console.log(error,'did not get user profile')
        
    })




   
  }, []);

  


    
    return (
      <div className='app'>

        
        
        <div className="the_app_name">Drugs R Us</div>
        
        <a href ='https://placeholder.com'>
          <img src ='https://via.placeholder.com/80x80'/> 
        </a>

        <Router>
          
          <NavBar/>
          <div className='switch_wrapper'> 
            <Switch>
              <Route  exact path="/" component={Buy} />
              <Route   path="/about" component={About} />
              <Route   path="/CheckInteractions" component={CheckInteractions} />
              <Route   path="/Checkout" component={Checkout} />
              <Route   path="/ConfirmationPurchase" component={ConfirmationPurchase} />
              <Route   path="/LoginRegister" component={LoginRegister} />
              <Route   path="/Sell" component={Sell} />
              <Route   path="/Userprofile" component={Userprofile} />
              <Route  component={ErrorPage} />
              
            </Switch>
          </div>
        </Router>
      </div>
    );
  }




export default App