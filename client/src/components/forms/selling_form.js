
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';


 const SellingForm=(prop)=>{
    let userProfile = useSelector(state => state.userProfile.originalProfile)
    const dispatch = useDispatch()


    return(

        <form onSubmit={(e)=>prop.handleSubmit(e)} autoComplete ='off'>
            <div>
                <div>
                    <label>Drug Name: </label>
                    <input
                        type="text"
                        name='drug_name'
                        placeholder="Drug Name"
                    />
               
                </div>
                <div>
                    <label>Price: </label>
                    <input
                        type="number"
                        name='drug_price'
                        placeholder="Drug Price"
                    />
                </div>
                <div>
                    <label>Quantity: </label>
                    <input
                        type="number"
                        name='drug_quantity'
                        placeholder="Drug Quantity"
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        </form> 
    )
}

export default SellingForm