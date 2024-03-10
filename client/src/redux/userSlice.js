import {createSlice} from  "@reduxjs/toolkit"; 
// here the stored string is being converted bak to object by JSON.parse
const user = JSON.parse(localStorage.getItem("user")); 

const userSlice = createSlice({ 
    name: "user", 
    initialState: {
         user: user
    },
    reducers: {
         addUser(state, action){
             state.user = action.payload
         }, 
         removeUser(state){
             state.user = null
         }
    }
}); 
export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer; 