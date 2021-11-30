import React,{ useState } from "react";
import { useSelector,useDispatch } from 'react-redux';

import { setEmail } from "../../actions";
import SellProductModal from "../modals/sell_product_modal";
import MessageModal from "../modals/message_modal";
import Products from "../products";
import {filter} from 'lodash';







export const Sell =() => {

  const counter_test = useSelector(state => state.counter)
  const storeProducts =  useSelector(state => state.storeProduct.product)
  let isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
  let profileFilled = useSelector(state=>state.profileStatusReducer.profileFilled)

  const [openModal,setToggleModal] = useState(false)
  const dispatch = useDispatch()
  //filter the product here than pass it down
  let filteredProduct;
  filteredProduct =_.filter(storeProducts, { 'email':'testing1'})

  
 
  return (
    <div>
      <div>
        
        { !openModal?(
          <div>
          
            <div>
                <h1>Sell history</h1>
                
                <Products products={filteredProduct} productType={"sellerProducts"} remaining='remaining'/>
                {(filteredProduct.length ==0)?(<div>No products are currently being sold by you</div>):null}

            </div>
            
            <hr/> 
            <div>
              <div>
                sell page
              </div>
              {/* opens a modal */}
              <button onClick={()=>setToggleModal(true)}>Sell Stuff</button> 
              
              {/* {values ? JSON.stringify(values, 0, 2) : ""} */}
              

            </div>
            {counter_test}
          </div>
        )
        :
        ((isLogged && profileFilled)?<SellProductModal closeModal={setToggleModal} />:  <MessageModal closeModal={setToggleModal} />)
        }
        

      </div>
    
    </div>
  );
};


