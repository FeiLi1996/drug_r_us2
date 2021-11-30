
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfile} from '../../actions';

 const UserProfileForm=()=>{
    let userProfile = useSelector(state => state.userProfile.originalProfile)
    const dispatch = useDispatch()
    return(

        <form>
            <div>
                <label>Profile Name: </label>
                <input
                    type="text"
                    value={userProfile.profile_name || ""}
                    onChange={(e) => dispatch(setUserProfile(['profile_name',e.target.value]))}
                    
                />
                </div>
                <div>
                <label>Date Of Birth: </label>
                <input
                    type="text"
                    value={userProfile.date_of_birth || ""}
                    onChange={(e) => dispatch(setUserProfile(['date_of_birth',e.target.value]))}
                    
                />
                </div>
                <div>
                <label>Address: </label>
                <input
                    type="text"
                    value={userProfile.address || ""}
                    onChange={(e) => dispatch(setUserProfile(['address',e.target.value]))}
                    
                />
                </div>
                <div>
                <label>Payment Card Number: </label>
                <input
                    type="text"
                    value={userProfile.payment_card_number || ""}
                    onChange={(e) => dispatch(setUserProfile(['payment_card_number',e.target.value]))}
                    placeholder="############"
                    maxLength="12"
                    
                    
                />
            </div>
        </form> 
    )
}

export default UserProfileForm