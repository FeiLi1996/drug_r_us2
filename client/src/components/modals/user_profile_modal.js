import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';


import {handleUserDrugList,setToPreviousUserProfile ,ConfirmNewUserProfile, switchProfileFilledStatus} from '../../actions';
import SearchBar from '../search/search_feature';
import UserProfileForm from '../forms/user_profile_form';
import axios from 'axios';



const  UserProfileModal =(prop)=>{

    const userProfile = useSelector(state => state.userProfile.originalProfile)
    const serverDrugList = useSelector(state => state.serverDrugList.general_drug_list)
    const [errorMesage,setErrorMessage ] = useState("");
    const dispatch = useDispatch()
    const { search } = window.location;
    
    let query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    console.log(serverDrugList,'hhelo')

    function handleCloseModal () {

        prop.closeModal(false)
        dispatch(setToPreviousUserProfile())
    }
    
    const confirmUseProfileChanges =()=>{
        // profile_name:"",
        // date_of_birth:"",
        // address:"",
        // payment_card:"",
        if(userProfile.profile_name ==='' || userProfile.date_of_birth ==='' || userProfile.address ==='' ||  userProfile.payment_card==='' ){
            
            setErrorMessage('please fillout empty fields' )
        }
        else if(isNaN(userProfile.payment_card)){
            setErrorMessage('please put numbers for payment card' )
        }
       else{


            axios
            .post(
                "http://127.0.0.1:5000/edit_user_profile",
                { withCredentials: true,

                    'userProfile':{
                        "profile_name":userProfile.profile_name,
                        "date_of_birth":userProfile.date_of_birth,
                        "address":userProfile.address,
                        "payment_card":userProfile.payment_card,
                        "drug_profile":userProfile.drug_profile,
                        "user_email":userProfile.user_email
                    }
                    
                }
                
                
            )
            .then(response => {
                console.log(response,'success editted profile')
                dispatch(switchProfileFilledStatus())
            })
            .catch(error => {
                console.log(error,'fail profile editted')
                
            })


            prop.closeModal(false)
            dispatch(ConfirmNewUserProfile())
        }
    }

    const filterPosts = (serverDrugList, query) => {
        let limitedServerDrugList=[]
        if (!query) {
            return serverDrugList.slice(0, 3);
        }
    
        limitedServerDrugList= serverDrugList.filter((drug) => {
            const postName = drug.toLowerCase();
            return postName.includes(query);
        });
        return limitedServerDrugList.slice(0, 5)
    };
  
    const filteredPosts = filterPosts(serverDrugList, searchQuery);
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn ">
                    <button onClick={handleCloseModal}>X</button>
                </div>
                <div className="title">
            
                </div>
                <div className="body">
                    <UserProfileForm />
                        
                    <div>
                        <div>Medication List:
                            <ul>
                                {userProfile.drug_profile.map((drug,idx)=>
                                <li key={idx}> 
                                    {drug} <span  onClick={()=>dispatch(handleUserDrugList('DELETE_DRUG_FROM_MED_LIST',drug))}> X</span>
                                </li>

                                )}
                                
                            </ul>   
                        </div>
                    
                        <SearchBar 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <ul>
                            {filteredPosts.map((drug,index) => (
                                <div key={index}>

                                    <span >{drug}</span>
                                    <span onClick={()=>dispatch(handleUserDrugList('ADD_DRUG_TO_MED_LIST',drug))}>+</span>
                                    
                                </div>
                            ))}
                        </ul>
                    </div>
                   
                </div>
                <div>{errorMesage}</div> 
                <div className="footer"> 
                    <button id="cancelBtn" onClick={handleCloseModal}>Cancel</button>
                    <button  onClick={ confirmUseProfileChanges}>Submit</button>
                </div>

            </div>
            
        </div>
    )
}
export default UserProfileModal
