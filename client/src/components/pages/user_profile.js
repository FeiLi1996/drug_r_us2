
import React,{ useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { getFormValues } from 'redux-form'
import { connect } from 'react-redux'



import UserProfileModal from "../modals/user_profile_modal"
import MessageModal from "../modals/message_modal";





 const Userprofile =() => {

  const [openModal,setToggleModal] = useState(false)
 
  const userProfile = useSelector(state => state.userProfile.originalProfile)
  let isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  const dispatch = useDispatch()
  
   
  
  
  
  
  return (
    <div className="user_profile_wrapper">
      
      

        <div className="edit_profile_modal_button_wrapper">
          <button className="edit_profile_modal_button" onClick={()=>{setToggleModal(true)}}>Edit Profile</button>
        </div>  
        {openModal && isLogged && <UserProfileModal closeModal={setToggleModal}/>}
        {openModal && !isLogged && <MessageModal closeModal={setToggleModal}/>}
        
        <div className="profile">
          <div>Profile Name:<span className='profile_inputs'>{userProfile.profile_name}</span></div>
          <div>Date of Birth:<span className='profile_inputs'>{userProfile.date_of_birth}</span></div>
          <div>Address:<span className='profile_inputs'>{userProfile.address}</span> </div>  
          <div>Payment Card:<span className='profile_inputs'>{userProfile.payment_card}</span></div> 
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