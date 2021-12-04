import React from 'react';

import { useHistory } from "react-router-dom";







const  MessageModal =(prop)=>{
   
    let history = useHistory();
    function handleRedirect(path){
        history.push(path);
    }

    let pageHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    


    return(
        <div className={`modalBackground ${prop.cancelFloatCss}`} style={{height:`${pageHeight}px`}}>
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
                    <button  className="modal_button" onClick={()=>{handleRedirect("/userprofile")}}>User Profile</button>
                    
                </div>

            </div>
            
        </div>
    )
}
export default MessageModal