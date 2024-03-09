import {configureStore} from "@reduxjs/toolkit"; 
import authReducer from "../redux/authSlice"; 
import cartReducer from "../redux/cartSlice";
import userReducer from "../redux/userSlice"
 const store = configureStore({
    reducer : {
      auth: authReducer,
      cart: cartReducer,
       user: userReducer
    }
 }); 
  export default store; 
