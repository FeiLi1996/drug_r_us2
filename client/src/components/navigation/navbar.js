import React from "react";
import {NavLink} from 'react-router-dom'

export const NavBar =() => {

  let isLogged = false;
  return (
    <div>

        <div className="greeting_and_logging">
            <div className='greeting'>
                Hello (profile_name)

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