import React,{useEffect} from "react";
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";




import {FilterProducts} from '../filter/filter'
import ShoppingCart from "../cart/shopping_cart";
import StoreProducts from "../store/store_product";
import { saveServerDrugList,setDatabaseProductToStore } from "../../actions";






export const Buy =() => {
  const storeProducts =  useSelector(state => state.storeProduct.product)
  const cartProducts =  useSelector(state => state.cartProduct.product)
  const dispatch = useDispatch();
  useEffect(() => {
    axios
    .get(
        "http://127.0.0.1:5000/get_drug_list",
        { withCredentials: true}
        
        
    )
    .then(response => {
        console.log(response,'got drug list')
        dispatch(saveServerDrugList(response.data.drug_list))
    })
    .catch(error => {
        console.log(error,'did not get druglist')
        
    })




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
  }, []);


  return (
    <div>
 
      <div>Buy</div> 
      <FilterProducts />
      <ShoppingCart products={cartProducts}/>
      <StoreProducts products={storeProducts}/>
    </div>
  );
};
