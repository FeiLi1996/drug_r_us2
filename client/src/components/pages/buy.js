import React from "react";
import { useSelector } from 'react-redux';







import {FilterProducts} from '../filter/filter'
import ShoppingCart from "../cart/shopping_cart";
import StoreProducts from "../store/store_product";








export const Buy =() => {
  const storeProducts =  useSelector(state => state.storeProduct.product)
  const cartProducts =  useSelector(state => state.cartProduct.product)
  


  return (
    <div>
 
      <div>Buy</div> 
      <FilterProducts />
      <ShoppingCart products={cartProducts}/>
      <StoreProducts products={storeProducts}/>
    </div>
  );
};
