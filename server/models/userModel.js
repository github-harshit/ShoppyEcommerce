const mongoose = require("mongoose"); 
const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true, 
        unique: true

    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
   
     password: {
             type: String, 
             required: true
        }, 

    gender: {
         type: String
    },
    dob: {
         type: Date, 
         time: false,
        
    }
    
})
 const User = new mongoose.model('User', userSchema); 
 module.exports = User; 
 