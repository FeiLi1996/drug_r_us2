const INITIAL_STATE={
    isLogged:false,
    profileFilled:false
}

const profileStatusReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SWITCH_LOGIN_STATUS':
            return {
                ...state,
                isLogged:!state.isLogged
            }
       
        case 'SWITCH_PROFILEFILLED_STATUS':
            return {
                ...state,
                profileFilled:true
            }
        default:
            return state;
        

    }

}
export default profileStatusReducer;