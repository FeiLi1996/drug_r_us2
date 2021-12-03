import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import axios from 'axios';


import { addToStore,setDatabaseProductToStore } from '../../actions';
import SellingForm from '../forms/selling_form';





const  SellProductModal =(prop)=>{
    const [errorMessage,setErrorMessage] = useState('')
    
    const dispatch= useDispatch()
    const user_email = useSelector(state =>state.userProfile.originalProfile.user_email)
   
    


    function handleSubmit(event){
      event.preventDefault();
      const drug_name = event.target.drug_name.value 
      
      if (drug_name  ==='' || event.target.drug_price.value ==="" || event.target.drug_quantity.value ===''){
          setErrorMessage("Please fill out empty fields")
          
      }
      else if(parseInt(drug_name )  == drug_name || parseFloat(drug_name ) == drug_name){
        setErrorMessage("No numbers for drug name")
      }
      else{

        axios
        .post(
            "http://127.0.0.1:5000/send_products",
            { withCredentials: true, 
            
            
              "name":drug_name,
              "price":event.target.drug_price.value,
              "quantity":event.target.drug_quantity.value,
              "user_email" :user_email
            }
            
            
        )
        .then(response => {
            console.log(response,'success')
            axios.get(
              "http://127.0.0.1:5000//get_overall_products",
              { withCredentials: true}
              
              
            )
            .then(response => {
                console.log(response.data,'got product list')
                dispatch(setDatabaseProductToStore(response.data))
            })
            .catch(error => {
                console.log(error,'did not get product list')
                
            })
        })
        .catch(error => {
            console.log(error,'fail login')
            
        })

        setErrorMessage('')
        prop.closeModal(false)
        dispatch(addToStore({drug_name:event.target.drug_name.value,
          price:parseInt(event.target.drug_price.value),
          quantity:parseInt(event.target.drug_quantity.value),
          email:user_email,
         

      }))
      }




        
        
        

        
    }

   
    /*function to handle all data submission bc images gotta be treated differently  

        
    */

    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn ">
                    <button onClick={()=>{prop.closeModal(false)}}>X</button>
                </div>
                <div className="title">
                   
                </div>
                <div className="body">
                 
                   
                  <SellingForm handleSubmit={handleSubmit}/>
                </div>
                <div>
                  {errorMessage}
                </div>
                
                <div className="footer"> 
                    <button id="cancelBtn" onClick={()=>{prop.closeModal(false)}}>Cancel</button>
                    
                </div>

            </div>
            
        </div>
    )
}
export default SellProductModal