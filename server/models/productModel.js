const mongoose =  require("mongoose"); 
const productSchema =  new mongoose.Schema({
    title: {
         type: String, 
         required: true
    }, 
    desc: {
         type: String, 
         required: true
    }, 
    img: {
         type: String,
         required:true
    }, 
    category: {
         type: Array, 
         required: true
    }, 
    size: {
         type:Array
    }, 
    color: {
         type: Array
    }, 
    price:{
         type:Number, 
         required: true
    }, 
    inStock: {
         type:Boolean, 
         default: true
    }
  
    
 
},{
     timestamps: true
});

const Product = mongoose.model("Product", productSchema); 
module.exports = Product; 