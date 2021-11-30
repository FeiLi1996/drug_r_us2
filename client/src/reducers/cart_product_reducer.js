import {findIndex,some} from 'lodash';


const INITIAL_STATE ={
    testing:'hi',
    totalPrice:0,
    product:[]
       
    // product:[
    //     {
    //         drug_name:'aspirin',
    //         price:5,
    //         quantity:5,
    //         email:'',
    //         id:1

    //     }
        
    // ]

}

const cartProduct = (state=INITIAL_STATE,action)=>{
    let tempCopy;
    let tempId;
    
    switch(action.type){
        case 'ADD_TO_CART':

            tempCopy=JSON.parse(JSON.stringify(action.payload))

            //if id already exist then do nothing  return ...state
            let alreadyExist = false;
         
            alreadyExist = _.some(state.product,{id:tempCopy.id})
            if(alreadyExist){
                return{
                    ...state,
                    msg:'already exist'
                }
            }
           
            tempCopy.maxQuantity = action.payload.quantity;
            tempCopy.quantity =1;
            return{
                ...state,
                product:[...state.product,tempCopy]
            }
                   
            
        case 'REMOVE_FROM_CART':
            tempCopy=JSON.parse(JSON.stringify(state))
            tempId=_.findIndex(tempCopy.product, {id:action.payload})
            tempCopy.product.splice(tempId,1)

            return {
                
                ...state,
                testing:'changed',
                product:tempCopy.product
            }
        case 'REMOVE_ALL_FROM_CART':
            tempCopy=JSON.parse(JSON.stringify(state))
            tempId=_.findIndex(tempCopy.product, {id:action.payload})
            tempCopy.product.splice(tempId,1)

            return {
                
                ...state,
                testing:'changed',
                product:[]
            }
        case 'INCREASE_QUANTITY':
 
            
            tempCopy=JSON.parse(JSON.stringify(state))
            tempId=_.findIndex(tempCopy.product, {id:action.payload})
            if (tempCopy.product[tempId].quantity !=tempCopy.product[tempId].maxQuantity){
                tempCopy.product[tempId].quantity +=1 
            }
            return {
                
                ...state,
                testing:'changed',
                product:tempCopy.product
                
            }
        case 'DECREASE_QUANTITY':
           
            
            tempCopy=JSON.parse(JSON.stringify(state))
            tempId=_.findIndex(tempCopy.product, {id:action.payload})
            
            if (tempCopy.product[tempId].quantity !=1){
                tempCopy.product[tempId].quantity -=1 
            }
            return {
                
                ...state,
                testing:'changed',
                product:tempCopy.product
                
            }
        case 'SET_TOTAL_PRICE':
        
        
            let totalPrice =0
            
            
            
            if (state.product.length == 0){
                return {
                
                    ...state,
                    testing:'changed',
                    totalPrice:totalPrice
                    
                    
                }   
            }

            state.product.map(product =>
                
                totalPrice+=product.quantity * product.price
            )
            console.log(totalPrice)
            
            
            return {
                
                ...state,
                testing:'changed',
                totalPrice:totalPrice//_.sum(totalPrice)
                
            }
        
        default:

            return state;
        

    }

}
export default cartProduct;