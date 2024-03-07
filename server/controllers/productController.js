const Product = require("../models/productModel"); 
const getCategoryProducts = async (req, res)=>{
     const category = req.params.category; 
      // we have to filter the product based on category 
      try{
          const products = await Product.find({ category: category });
          return res.json({ 
               status:200,
               products, products
        
       }) 
      }catch(err){
          const errMsg = err.toString(); 
          return res.json({
             status: 501, 
             msg: errMsg
          })
      }
       

}
const getProductById = async(req, res)=>{
     const  id = req.params.productId; 
    
      try{
           const product = await Product.findById(id); 
           return res.json({
                status:201, 
                product: product
           })
      }catch(err){
          const errMsg = err.toString(); 
          return res.json({
             status: 501, 
             msg: errMsg
          })
      }
}
 const addProduct = async(req, res)=>{
      try{
           console.log(req.body); 
     const {title, desc, img, category, size, color, price,inStock} = req.body;
      const newProduct = new Product({title, desc,img,category,size, color, price, inStock})
      const savedProduct = await newProduct.save(); 
      return res.json({
           status:201, 
           product: savedProduct
      })
           
      }catch(err){
          const errMsg = err.toString(); 
          return res.json({
             status: 501, 
             msg: errMsg
          })
      }
     

 } 
module.exports = {
     getCategoryProducts,
     addProduct, 
     getProductById
}