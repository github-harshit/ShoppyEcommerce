import {createSlice} from "@reduxjs/toolkit";



const cartSlice= createSlice({
     name: "cart", 
     initialState: {
         cartValue: 0
     }, 
     reducers: {
         addProduct(state,action) { 
            console.log(action)
             state.cartValue+=action.payload; 
             
         }, 
         removeProduct (state, action){
             state.cartValue-=action.payload
            
         }, 
         setInitialValue(state, action){
             state.cartValue = action.payload
         }
     }
})
export const{addProduct, removeProduct, setInitialValue} = cartSlice.actions;
export default cartSlice.reducer