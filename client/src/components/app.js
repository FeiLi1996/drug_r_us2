import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import axios from 'axios';
import { saveServerDrugList,setDatabaseProductToStore ,setEmail} from '../actions';





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
import { useSelector } from 'react-redux';



 const App  =({values})=>{
    const dispatch =useDispatch()
    const user_email = useSelector(state => state.userProfile.originalProfile.user_email)
 
   
    useEffect(() => {
      
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
        })

      })
      .catch(error => {
          console.log(error,'did not get user profile')
          
      })
                    
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
