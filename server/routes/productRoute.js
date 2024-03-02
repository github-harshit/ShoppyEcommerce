const express = require("express"); 
const {jwtVerify} = require("../middlewares/verify"); 
 const {getCategoryProducts, addProduct} = require("../controllers/productController"); 

const router = express.Router(); 
// get category products 
 router.get("/:category",  getCategoryProducts)
 // add product (admin) 
 router.post("/addProduct", addProduct)
 // delet product (admin)

module.exports = router; 
