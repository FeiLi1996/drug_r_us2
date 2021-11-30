
const INITIAL_STATE ={

    general_drug_list:['aspirin','ibuprofen','albuterol','warfarin','propranolol'],
 

}

const serverDrugList = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        
        case"SAVE_SERVER_DRUG_LIST":
            return{
                ...state,
                general_drug_list:action.payload
            }

        default:
            return state;
        

    }

}
export default serverDrugList;