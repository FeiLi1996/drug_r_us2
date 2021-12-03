import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import Products from "../products";
import { handleUserDrugList,removeAllFromCart,setDatabaseProductToStore } from "../../actions";
import axios from "axios";





export const Checkout =() => {

  const checkoutProducts =  useSelector(state => state.cartProduct.product)
  const userProfile = useSelector(state => state.userProfile.originalProfile)
  const history = useHistory();
  const dispatch = useDispatch();

  function handleConfirmationCheckout(){
    let drugNames =[];
    let cartProductDrugInfo =[];
    drugNames = checkoutProducts.map(product=>
          product.drug_name

    )
    checkoutProducts.map(product=>
      cartProductDrugInfo.push({
        
        'drug_id':product.id,
        'quantity':product.quantity


      })
      

    )
    
    axios
    .post(
        "http://127.0.0.1:5000/update_product_post_checkout",
        { withCredentials: true,
          'cartProductDrugInfo':cartProductDrugInfo
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
        console.log(error,'fail')
        
    })

      
    dispatch(handleUserDrugList('ADD_DRUGs_TO_MED_LIST',drugNames))
    dispatch(removeAllFromCart())
    history.push('/ConfirmationPurchase')
    

  }

  return (
    <div className="checkout_wrapper">


      
      <div className="profile">
          <div>Profile Name:{userProfile.profile_name}</div>
          <div>Address:{userProfile.address}   <br/>/n new line for address </div>  
          <div>Payment Card:{userProfile.payment_card}</div> 
      </div>
      <Products products={checkoutProducts}  productType={'checkoutProducts'}/>
      <button className="checkout_button" onClick={()=>history.push('/')}>Back To Shop</button>
      <button  className="checkout_button" onClick={handleConfirmationCheckout}>Confirm</button>
    </div>
    
  );
};