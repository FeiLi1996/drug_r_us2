import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import Products from "../products";
import { handleUserDrugList,removeAllFromCart } from "../../actions";
import axios from "axios";



//<Products products={props.products} productType={'cartProduct'}/>
//<Products products={checkOutProducts}  productType={'checkOutProducts'}/>

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
        
    })
    .catch(error => {
        console.log(error,'fail')
        
    })

      
    dispatch(handleUserDrugList('ADD_DRUGs_TO_MED_LIST',drugNames))
    dispatch(removeAllFromCart())
    history.push('/ConfirmationPurchase')
    

  }

  return (
    <div>
      <h1>DevCamp React Starter</h1>
      <h2>React Redux Router</h2>
      <div>Checkout</div>

      
      <div>
          <div>Profile Name:{userProfile.profile_name}</div>
          <div>Address:{userProfile.address}   <br/>/n new line for address </div>  
          <div>Payment Card:{userProfile.payment_card}</div> 
      </div>
      <Products products={checkoutProducts}  productType={'checkoutProducts'}/>
      <button onClick={()=>history.push('/')}>Back To Shop</button>
      <button onClick={handleConfirmationCheckout}>Confirm</button>
    </div>
    
  );
};