import React from "react";
import {NavLink} from 'react-router-dom'
import { useSelector } from "react-redux";
import Cookies from "js-cookie";


export const NavBar =() => {
  const userProfileName = useSelector(state => state.userProfile.originalProfile.profile_name)
  const isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  function handleLogout(){
    Cookies.remove('email')
    window.location.href=('/')
  }
  return (
    <div className="navbar_wrapper_overall">

        <div className="greeting_and_logging">
            <div className='greeting_wrapper'>
                Hello: <span className="profile_name">{userProfileName || 'Guest'}</span>

            </div>

            {isLogged ? (
            <div className="log_button_wrapper">
                 <button className="log_button" onClick={handleLogout}>
                     Logout    
                 </button> 
             </div>
             ) : (
            <div className="log_button_wrapper">
                <NavLink  to="/LoginRegister">
                    <button className="log_button">Login </button>
                </NavLink>
            </div>
             )}
           
           
        </div>
        <div className='navbar_wrapper'>
            <div>

            </div>
            <div className='navlink_wrapper_2'>
                <div>
                    <NavLink exact to='/' activeClassName="nav-link-active">
                        Buy
                    </NavLink> 
                </div>
                <div>
                    <NavLink  to='/sell' activeClassName="nav-link-active">
                        Sell
                    </NavLink> 
                </div>
                <div>
                    <NavLink  to='/checkinteractions' activeClassName="nav-link-active">
                        Check Interactions
                    </NavLink> 
                </div>
                <div>
                    <NavLink  to='/userprofile' activeClassName="nav-link-active">
                        User Profile
                    </NavLink> 
                </div>
                <div>
                    <NavLink  to='/About' activeClassName="nav-link-active">
                        About
                    </NavLink> 
                </div>
            
                
                
            </div> 
        
        </div>
    </div>
  );
};