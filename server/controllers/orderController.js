const Product = require("../models/productModel");

const stripe = require("stripe")("sk_test_51NiYu1SII5NT03lN8nDYqhT5NajA61ySdahkVS7ifvQuPyd7wC8Kk9za1dvpwUlpG0ouKPk7i4Ly4XfXBgDddqCE00QwJXoKhJ");
 
const handleCheckout = async (req, res)=>{
    
    const {cartData}  =req.body; 
    console.log(cartData)
const lineItems  = cartData.map((item)=> {
          return { 
            price_data: {
                 currency: "inr", 
                 product_data: {
                     name: item.product.title
                 }, 
                 unit_amount: item.product.price * 100,
            },
            quantity: item.quantity
         }
    })
    
      
     const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems  ,
      
        mode: 'payment',
        success_url: 'https://localhost:5173/payment/success',
        cancel_url: 'https://localhost:5173/payment/cancel',
      });
     return res.json({
         status:201, 
         sessionId: session.id
     })
}
module.exports= {
     handleCheckout
}