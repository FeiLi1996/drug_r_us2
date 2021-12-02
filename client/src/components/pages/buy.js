import React,{useEffect} from "react";
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";




import {FilterProducts} from '../filter/filter'
import ShoppingCart from "../cart/shopping_cart";
import StoreProducts from "../store/store_product";







export const Buy =() => {
  const storeProducts =  useSelector(state => state.storeProduct.product)
  const cartProducts =  useSelector(state => state.cartProduct.product)
  const dispatch = useDispatch();
 


  return (
    <div>
 
      <div>Buy</div> 
      <FilterProducts />
      <ShoppingCart products={cartProducts}/>
      <StoreProducts products={storeProducts}/>
    </div>
  );
};
