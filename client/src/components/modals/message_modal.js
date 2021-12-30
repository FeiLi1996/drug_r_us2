import React from 'react';

import { useHistory } from "react-router-dom";


const  MessageModal =(prop)=>{
   
    let history = useHistory();
    function handleRedirect(path){
        history.push(path);
    }

    return(
        <div className={`modalBackground ${prop.cancelFloatCss}`}>
            <div className="modalContainer">
                <div className="titleCloseBtn ">
                    <button className="cancelBtn" onClick={()=>{prop.closeModal(false)}}>X</button>
                </div>
                <div className="title">
                   
                </div>
                <div className="body error_message">
                  Please login first then fill your userprofile.
                    
                </div>
            
              
                
                <div className="footer"> 
                    <button className="cancelBtn" onClick={()=>{prop.closeModal(false)}}>Cancel</button>
                    <button  className="modal_button" onClick={()=>{handleRedirect("/LoginRegister")}}>Log In</button>
                    <button  className="modal_button" onClick={()=>{handleRedirect("/userprofile")}}>Profile</button>
                    
                </div>

            </div>
            
        </div>
    )
}
export default MessageModal