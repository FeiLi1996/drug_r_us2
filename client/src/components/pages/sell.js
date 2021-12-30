import React,{ useState } from "react";
import { useSelector,useDispatch } from 'react-redux';


import SellProductModal from "../modals/sell_product_modal";
import MessageModal from "../modals/message_modal";
import Products from "../products";
import {filter} from 'lodash';







export const Sell =() => {


  const storeProducts =  useSelector(state => state.storeProduct.product)
  let isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  let profileFilled = useSelector(state=>state.profileStatusReducer.profileFilled)
  const user_email = useSelector(state => state.userProfile.originalProfile.user_email)
  const [openModal,setToggleModal] = useState(false)
  const dispatch = useDispatch()

  let filteredProduct;
  filteredProduct =_.filter(storeProducts, { 'email':user_email})

  
 
  return (
    <div className="sell_wrapper">
     
        
        { !openModal?(
          <div>
          
            <div className="user_sell_product">
                <h1>Sell Dashboard</h1>
                
                <Products products={filteredProduct} productType={"sellerProducts"} remaining='Remaining' cssDynamicNameParent='sellProducts' cssDynamicNameChild='eachProduct'/>
                {(filteredProduct.length ==0)?(<h2>No products are currently being sold by you</h2>):null}

            </div>
            
            <hr className="horizontal_line"/> 
            <div>
             
              
              <button className="sell_button" onClick={()=>setToggleModal(true)}>Sell Stuff</button> 
              
              {/* {values ? JSON.stringify(values, 0, 2) : ""} */}
              

            </div>
     
          </div>
        )
        :
        ((isLogged && profileFilled)?<SellProductModal closeModal={setToggleModal} />:  <MessageModal closeModal={setToggleModal} />)
        }
        

     
    
    </div>
  );
};


