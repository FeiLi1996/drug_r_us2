
import React,{ useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { getFormValues } from 'redux-form'
import { connect } from 'react-redux'



import UserProfileModal from "../modals/user_profile_modal"
import MessageModal from "../modals/message_modal";




// const INITIAL_STATE ={
//   profile_name:"",
//   date_of_birth:"",
//   address:"",
//   payment_card:"",
//   drug_profile:[],
//   user_email:"testing"

// }

 const Userprofile =() => {

  const [openModal,setToggleModal] = useState(false)
 
  const userProfile = useSelector(state => state.userProfile.originalProfile)
  let isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  const dispatch = useDispatch()
  
   
  console.log(userProfile.drug_profile)
  
  
  
  return (
    <div className="user_profile_wrapper">
      
      

        
        <button className="modal_button" onClick={()=>{setToggleModal(true)}}>Edit Profile</button>
        {openModal && isLogged && <UserProfileModal closeModal={setToggleModal}/>}
        {openModal && !isLogged && <MessageModal closeModal={setToggleModal}/>}
        
        <div className="profile">
          <div>Profile Name:{userProfile.profile_name}</div>
          <div>Date of Birth:{userProfile.date_of_birth}</div>
          <div>Address:{userProfile.address} </div>  
          <div>Payment Card:{userProfile.payment_card}</div> 
          <div className="med_header">Medication List:
            {(userProfile.drug_profile.length != 0 )?
              (<ul className="medication_list">
                {userProfile.drug_profile.map((drug,idx)=>
                  <li className="medication" key={idx}> {drug}</li>

                )}
                  
              </ul>)
              :
              <div className="error_message">No medication(s) in profile</div>
            } 
          </div>

        </div>

        

        
     
    
    </div>
  );
};

export default connect(state => ({
  values: getFormValues("authForm")(state)
}))(Userprofile);