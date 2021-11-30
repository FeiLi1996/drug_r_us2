export const filterStoreProduct = (filterType) =>{
    return{
        type:filterType
        

    }
}

export const addToStore = (product) =>{
    return{
        type:'ADD_TO_STORE',
        payload:product

    }
}

export const setDatabaseProductToStore = (product) =>{
    return{
        type:'SET_DATABASE_PRODUCT_TO_STORE',
        payload:product

    }
}


export const removeFromStore= (id) =>{
    return{
        type:'REMOVE_FROM_STORE',
        payload:id

    }
}


export const addImgToStore = (image) =>{
    return{
        type:'ADD_TO_STORE',
        payload:image

    }
}
