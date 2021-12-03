import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../actions';
import { increaseQuantity,decreaseQuantity,removeFromCart,removeFromStore } from '../actions';
import axios from 'axios';

  const Products =(props)=>{
    
    const testingTotalPrice = useSelector(state => state.cartProduct.totalPrice)
    const dispatch = useDispatch()
   
  
    function testAddToCart (Product) {
        console.log(dispatch(addToCart(Product)))

        console.log(Product)
        console.log('hello')
    }
    function handleRemoveProductFromStore (id) {



        axios
        .post(
            "http://127.0.0.1:5000/delete_product",
            { withCredentials: true, 
            
            
              "id":id
            }
            
            
        )
        .then(response => {
            console.log(response,'success delete')
        })
        .catch(error => {
            console.log(error,'fail delete')
            
        })


        dispatch(removeFromStore(id))
        dispatch(removeFromCart(id))

    }

   



    function dynamicButtons (product){
        if (props.productType === 'cartProduct'){
            return(
                <div className="cartProductButtons_wrapper">
                    <button className="cartProductButton" onClick={()=>dispatch(increaseQuantity(product.id))}>+</button>
                    <button className="cartProductButton" onClick={()=>dispatch(decreaseQuantity(product.id))}>-</button>
                    <button className="cartProductButton" onClick={()=>dispatch(removeFromCart(product.id))}>Delete</button>
                </div>
            )
        }
        else if(props.productType === 'storeProducts'){
            return(
                <div className="storeProductButtons_wrapper">
                    <button  className="storeProductButton" onClick={()=>testAddToCart(product)}>Add To Cart</button>
                    
                </div>
            )
        }
        else if(props.productType === 'sellerProducts'){
            return(
                <div className="sellerProductButtons_wrapper">
                    <button className="sellerProductButton" onClick={()=>handleRemoveProductFromStore(product.id)}>Delete</button>
                    
                </div>
            )
        }

    }
    const individualProducts = props.products.map((product,idx) =>{

     
        
        return(

            
            <div key={idx} className="product_wrapper">
                <div>
                    <img src ='https://via.placeholder.com/160x160'/> 
                </div>
               
                
                <div>Drug Name:{product.drug_name}</div>
                <div>Drug Price:${product.price}</div>
              
                <div>Quantity {props.remaining}:{product.quantity}</div>
                
                {dynamicButtons(product)}
                
           </div>
        )

    })
    
    return(
        <div className="product_overall_wrapper">

           {individualProducts}
           {props.productType ==='checkoutProducts'?  <div>Total Price:{testingTotalPrice}</div>:null}
        </div>
    )
}
export default Products