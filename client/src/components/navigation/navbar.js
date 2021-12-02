import React from "react";
import {NavLink} from 'react-router-dom'
import { useSelector } from "react-redux";

export const NavBar =() => {
  const userProfileName = useSelector(state => state.userProfile.originalProfile.profile_name)
  let isLogged = false;
  return (
    <div>

        <div className="greeting_and_logging">
            <div className='greeting'>
                Hello:{userProfileName || 'Guest'}

            </div>

            {isLogged ? (
            <div>
                 <button>
                     Logout    
                 </button> 
             </div>
             ) : (
            <div>
                <NavLink  to="/LoginRegister">
                    Login
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