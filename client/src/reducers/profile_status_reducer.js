const INITIAL_STATE={
    isLogged:true,
    profileFilled:true
}

const profileStatusReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SWITCH_LOGIN_STATUS':
            return {
                ...state,
                isLogged:!state.isLogged
            }
        default:
            return state;
        

    }

}
export default profileStatusReducer;