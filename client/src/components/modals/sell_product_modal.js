import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import DropzoneComponent from "react-dropzone-component";
import axios from 'axios';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import { addToStore,addImgToStore } from '../../actions';
import SellingForm from '../forms/selling_form';





const  SellProductModal =(prop)=>{
    const [errorMessage,setErrorMessage] = useState('')
    const dispatch= useDispatch()
    const user_email = useSelector(state =>state.userProfile.originalProfile.user_email)
   
 
    function componentConfig() {
      return {
        iconFiletypes: [".jpg", ".png"],
        showFiletypeIcon: true,
        postUrl: "https://httpbin.org/post"
      };
    }
  
    function djsConfig() {
      return {
        addRemoveLinks: true,
        maxFiles: 1
      };
    }

    function handleThumbDrop() {
      return {
        addedfile: file => setTesting123({ thumb_image: file })
      };
    }


    function handleSubmit(event){
      event.preventDefault();
      console.log(event.target.drug_name.value,'drug name')
      if (event.target.drug_name.value ==='' || event.target.drug_price.value ==="" || event.target.drug_quantity.value ===''){
          setErrorMessage("Please fill out empty fields")
          
      }
      else{
     
        axios
        .post(
            "http://127.0.0.1:5000/send_products",
            { withCredentials: true, 
            
            
              "name":event.target.drug_name.value,
              "price":event.target.drug_price.value,
              "quantity":event.target.drug_quantity.value,
              "user_email" :user_email
            }
            
            
        )
        .then(response => {
            console.log(response,'success')
        })
        .catch(error => {
            console.log(error,'fail login')
            
        })

        setErrorMessage('')
        prop.closeModal(false)
        dispatch(addToStore({drug_name:event.target.drug_name.value,
          price:event.target.drug_price.value,
          quantity:event.target.drug_quantity.value,
          email:user_email,
          //image:testing123

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
                  <div className="image-uploaders">
                    <DropzoneComponent
                      config={componentConfig()}
                      djsConfig={djsConfig()}
                      eventHandlers={handleThumbDrop()}
                    />
                  </div>
                   
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