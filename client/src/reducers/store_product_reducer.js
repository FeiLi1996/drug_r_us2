import {sortBy,orderBy} from 'lodash';

const INITIAL_STATE ={
    //product:[]
    product:[
        // {
        //     drug_name:'aspirin',
        //     price:15,
        //     quantity:5,
        //     email:'',
        //     id:1001

        // },
        // {
        //     drug_name:'albuterol',
        //     price:10,
        //     quantity:4,
        //     email:'testing1',
        //     id:1002

        // },
        // {
        //     drug_name:'ibuprofen',
        //     price:13,
        //     quantity:4,
        //     email:'testing1',
        //     id:1003

        // },
        // {
        //     drug_name:'aspirin',
        //     price:15,
        //     quantity:5,
        //     email:'',
        //     id:1004

        // },
        // {
        //     drug_name:'albuterol',
        //     price:10,
        //     quantity:4,
        //     email:'testing1',
        //     id:1005

        // },
        // {
        //     drug_name:'ibuprofen',
        //     price:13,
        //     quantity:4,
        //     email:'testing1',
        //     id:1006

        // },
        // {
        //     drug_name:'aspirin',
        //     price:15,
        //     quantity:5,
        //     email:'',
        //     id:1004

        // },
        // {
        //     drug_name:'aspirin',
        //     price:15,
        //     quantity:5,
        //     email:'',
        //     id:1004

        // },
        // {
        //     drug_name:'aspirin',
        //     price:15,
        //     quantity:5,
        //     email:'',
        //     id:1004

        // },

    ]
}

const storeProduct = (state=INITIAL_STATE,action)=>{
    let tempCopy;
    let tempId;
    tempCopy=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'SET_DATABASE_PRODUCT_TO_STORE':
            return {
                
                ...state,
                product:action.payload
            }
        case 'ADD_TO_STORE':
            return {
                
                ...state,
                product:[...state.product,action.payload]
            }

      
        case 'REMOVE_FROM_STORE':
 
            tempId=_.findIndex(tempCopy.product, {id:action.payload})
            tempCopy.product.splice(tempId,1)
            return {
                
                ...state,
                product:tempCopy.product
                
            }
     
        case 'NO_FILTER':
            
            
            return {
                
                product:state.originalProduct
                
            }
        case 'FILTER_BY_LOW_TO_HIGH':
            let sortedLowToHigh = _.sortBy(tempCopy.product, 'price');
            
            return {
                
                ...state,
                originalProduct:tempCopy.product,
                product:sortedLowToHigh
                
            }
        case 'FILTER_BY_HIGH_TO_LOW':
            let sortedHighToLow = _.orderBy(tempCopy.product, ['price'],['desc']);
            
            return {
                
                ...state,
                originalProduct:tempCopy.product,
                product:sortedHighToLow
                
            }
        case 'FILTER_BY_A_TO_Z':
            let sortedAToZ = _.sortBy(tempCopy.product, 'drug_name');
            
            return {
                
                ...state,
                originalProduct:tempCopy.product,
                product:sortedAToZ
                
            }
        case 'FILTER_BY_Z_TO_A':
            let sortedZToA = _.orderBy(tempCopy.product, ['drug_name'],['desc']);
            
            return {
                
                ...state,
                product:sortedZToA
                
            }
    
    


        default:
            return state;
        

    }

}
export default storeProduct;