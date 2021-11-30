const testDrop = (state={img:''},action)=>{
    switch(action.type){
        case 'ADD_TO_STORE':
            return {
                ...state,
                img:action.payload
            }
        default:
            return state;

    }

}
export default testDrop;