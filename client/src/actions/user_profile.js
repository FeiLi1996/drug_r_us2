
//
export const switchLoginStatus = () =>{
    return{
        type:'SWITCH_LOGIN_STATUS'
    }
}

export const switchProfileFilledStatus = () =>{
    return{
        type:'SWITCH_PROFILEFILLED_STATUS'
    }
}





export const setEmail = (user_email) =>{
    return{
        type:'SET_EMAIL',
        payload:user_email

    }
}





export const setUserProfile = (userProfile) =>{
    return{
        type:'SET_USER_PROFILE',
        payload:userProfile

    }
}

export const setUserCopiedProfileAfterRetrieval = (userProfile) =>{
    return{
        type:'SET_COPIEDPROFILE_AFTER_RETRIEVAL',
        payload:userProfile

    }
}

//if the user presses cancel when adjusting user_profile_form
export const setToPreviousUserProfile = () =>{
    return{
        type:'REVERT_TO_PREVIOUS_PROFILE'
     

    }
}


export const ConfirmNewUserProfile = () =>{
    return{
        type:'CONFIRM_NEW_USER_PROFILE'
     

    }
}






export const handleUserDrugList= (actionType,drugName) =>{
   
    return{
        type:actionType,
        payload:drugName

    }
}


