import React from 'react';

import { useHistory } from "react-router-dom";







const  MessageModal =(prop)=>{
   
    let history = useHistory();
    function handleRedirect(path){
        history.push(path);
    }





    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn ">
                    <button onClick={()=>{prop.closeModal(false)}}>X</button>
                </div>
                <div className="title">
                   
                </div>
                <div className="body">
                  Please login first then fill your userprofile.
                    
                </div>
            
              
                
                <div className="footer"> 
                    <button id="cancelBtn" onClick={()=>{prop.closeModal(false)}}>Cancel</button>
                    <button  onClick={()=>{handleRedirect("/LoginRegister")}}>Log In</button>
                    <button  onClick={()=>{handleRedirect("/userprofile")}}>User Profile</button>
                    
                </div>

            </div>
            
        </div>
    )
}
export default MessageModal