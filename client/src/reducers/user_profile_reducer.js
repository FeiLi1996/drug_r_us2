import {findIndex} from 'lodash';

const INITIAL_STATE ={

    originalProfile:{
        // profile_name:"hi",
        // date_of_birth:"12/16/12",
        // address:"86  merrimac street buffalo ny 14214",
        // payment_card:"4123123412343124",
        // //drug_profile:['aspirin','ibuprofen','albuterol','warfarin','propranolol'],
        // drug_profile:['aspirin','ibuprofen','albuterol'],
        // user_email:"testing1"

        profile_name:"",
        date_of_birth:"",
        address:"",
        payment_card:"",
        drug_profile:[],
        user_email:""
        },
    // copyProfile:{
    //     profile_name:"hi",
    //     date_of_birth:"12/16/12",
    //     address:"86  merrimac street buffalo ny 14214",
    //     payment_card:"4123123412343124",
    //     //drug_profile:['aspirin','ibuprofen','albuterol','warfarin','propranolol'],
    //     drug_profile:['aspirin','ibuprofen','albuterol'],
    //     user_email:"testing1"
    // }
    copyProfile:{
        profile_name:"",
        date_of_birth:"",
        address:"",
        payment_card:"",
        drug_profile:[],
        user_email:""
    }


}

const userProfile = (state=INITIAL_STATE,action)=>{
    let tempCopy;
    let tempId;
    switch(action.type){
        
       
        case 'SET_USER_PROFILE':
            // profileAttribute=action.payload[0]
            //profileAttributeNewValue =action.payload[1]
            return {
                
                ...state,
                originalProfile:{
                    ...state.originalProfile,
                    [action.payload[0]]:action.payload[1]
                }

            }
        case 'SET_COPIEDPROFILE_AFTER_RETRIEVAL':
            // profileAttribute=action.payload[0]
            //profileAttributeNewValue =action.payload[1]
            return {
                
                ...state,
                copyProfile:{
                    ...state.originalProfile,
                    [action.payload[0]]:action.payload[1]
                }

            }
        case 'CONFIRM_NEW_USER_PROFILE':
            tempCopy=JSON.parse(JSON.stringify(state.originalProfile))
            return {
                
                ...state,
                copyProfile:{...tempCopy}
            }
        case 'ADD_DRUG_TO_MED_LIST':
            if(state.originalProfile.drug_profile.includes(action.payload)){
                return {
                
                    ...state,
    
                }
            }

            return {
                
                ...state,
                originalProfile:{
                    ...state.originalProfile,
                    drug_profile:[...state.originalProfile.drug_profile,action.payload]
                }
                
 
            }
            case 'ADD_DRUGs_TO_MED_LIST':
            let uniqueCombinedDrugList = [];
            uniqueCombinedDrugList =_.union(state.originalProfile.drug_profile,action.payload)
             
            return {
                
                ...state,
                originalProfile:{
                    ...state.originalProfile,
                    drug_profile:uniqueCombinedDrugList
                }
                
 
            }
        case 'DELETE_DRUG_FROM_MED_LIST':
            tempCopy=JSON.parse(JSON.stringify(state))
            tempId=_.findIndex(tempCopy.originalProfile.drug_profile, action.payload)
            tempCopy.originalProfile.drug_profile.splice(tempId,1)
            return {
                
                ...state,
                originalProfile:{
                    ...state.originalProfile,
                    drug_profile:tempCopy.originalProfile.drug_profile
                }
              

            }
        case 'REVERT_TO_PREVIOUS_PROFILE':
            
            return {
                
                ...state,
                originalProfile:{...state.copyProfile}

               
                

            }
        default:
            return state;
        

    }

}
export default userProfile;