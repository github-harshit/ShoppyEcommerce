import {createSlice} from "@reduxjs/toolkit"; 
 const storedValue = localStorage.getItem('token'); 
 
const authSlice = createSlice({
    name: "auth",
    initialState:{
        token : storedValue
    },
    reducers: {
        setToken(state, action){
            state.token = action.payload;
        }, 
        removeToken(state){
            state.token= null; 
        }
    }
}); 
export const {setToken, removeToken}  = authSlice.actions; 
export default authSlice.reducer; 
