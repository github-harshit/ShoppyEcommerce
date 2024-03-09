
const Cart = require("../models/cartModel")
const addProduct = async (req, res)=>{
     

     try{
        const {userId, productId, quantity}= req.body;
        
        let cart = await Cart.findOne({userId: req.user}); 
        // first we will have to check if this product is already in the cart if it is 
        // already there then we have to just increment the quantity of that product
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if(existingItem){
         existingItem.quantity += quantity;
        }else{
           cart.items.push({product: productId, quantity:quantity}); 
        }
       
        await cart.save(); 
        return res.json({
             status: 201,
              msg : "product is successfully added to cart ", 
              cart: cart
        })

         
     }catch(err){
        const errMsg = err.toString(); 
        return res.json({
            status: 501, 
            msg: errMsg
         })
     }
}
const getAllProducts = async(req, res)=>{
     try{
        const id = req.params.id; 
        const cart = await Cart.findOne({userId:id}).populate('items.product'); 
        
        return res.json({
          status:201, 
          cart: cart
        })
       
        
     }catch(err){
        const errMsg = err.toString(); 
        return res.json({
            status: 501, 
            msg: errMsg
         })
     }
}
const removeProduct = async(req, res)=>{
   const  productId = req.params.id; 
   try{
      let cart = await Cart.findOne({userId: req.user});
      cart.items = cart.items.filter((item)=> item.product != productId); 

      await cart.save(); 
      return res.json({
          status:201, 
          msg: "product removed sucessfully from cart ", 
          cart:cart
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
     addProduct, 
     getAllProducts, 
     removeProduct
}