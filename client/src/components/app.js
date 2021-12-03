import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import axios from 'axios';

import Cookies from 'js-cookie'



import logo0 from '../../static/assets/images/0.jpg'
import logo1 from '../../static/assets/images/1.jpg'
import logo2 from '../../static/assets/images/2.jpg'
import logo3 from '../../static/assets/images/3.jpg'
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
import { 
  saveServerDrugList,
  setDatabaseProductToStore ,
  switchProfileFilledStatus,
  setUserCopiedProfileAfterRetrieval,
  switchLoginStatus,
  setUserProfile

} from '../actions';





 const App  =()=>{
    const dispatch =useDispatch()
    const [Counter,setCounter] = useState(0);

     
   
    useEffect(() => {
      
      const user_email= Cookies.get('email')
      
      if(user_email){
          dispatch(setUserProfile(['user_email',user_email]))
          dispatch(setUserCopiedProfileAfterRetrieval(['user_email',user_email]))
          dispatch(switchLoginStatus())

    

          axios.post(
            "http://127.0.0.1:5000/get_user_profile",
            { withCredentials: true,
              "user_email":user_email
            }
  
            )
            .then(response => {
              console.log(response,'retrieved user profile')
              Object.entries(response.data).map(profileAttribute => {
                
                dispatch(setUserProfile(profileAttribute))
                dispatch(setUserCopiedProfileAfterRetrieval(profileAttribute))
                
              })
              dispatch(switchProfileFilledStatus())
            })
            .catch(error => {
                console.log(error,'did not get user profile')
                
            })
       }





        else{
          console.log('not logged in')
        }
      



      
                    
      axios.get(
        "http://127.0.0.1:5000/me",
        //"http://localhost:5000/me",
        {withCredentials: true}
        
      )
        .then(response => {

          console.log(response,'auth')

      })
      .catch(error => {
          console.log(error,'no auth')
          
      })
        



      axios.get(
          "http://127.0.0.1:5000/get_drug_list",
          { withCredentials: true}
          
          
      )
      .then(response => {
          console.log(response,'got drug list')
          dispatch(saveServerDrugList(response.data.drug_list))
      })
      .catch(error => {
          console.log(error,'did not get druglist')
          
      })


      axios.get(
        "http://127.0.0.1:5000//get_overall_products",
        { withCredentials: true}
        
        
      )
      .then(response => {
          console.log(response.data,'got product list')
          dispatch(setDatabaseProductToStore(response.data))
      })
      .catch(error => {
          console.log(error,'did not get product list')
          
      })

      
 



    
    }, []);


    useEffect(() => {
      const timeout = setTimeout(() => {
        setCounter((Counter + 1)%4);
      }, 5000);
  
      return () => {
        clearTimeout(timeout);
      };

    }, [Counter]);
    

    function imageSwitch(){
      
      return `../../static/assets/images/${Counter}.jpg`
    }


    
    return (
      <div className='app'>

        
        <div className="app_name_and_logo">
          <div className="the_app_name">Drugs R Us2</div>
          
          <div className="logo">
            <img src = {imageSwitch()}/> 
          </div>
        </div>
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
