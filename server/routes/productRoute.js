const express = require("express"); 
const {jwtVerify} = require("../middlewares/verify"); 
 const {getCategoryProducts, addProduct, getProductById} = require("../controllers/productController"); 

const router = express.Router(); 
// get category products 
 router.get("/category/:category", jwtVerify,  getCategoryProducts)
 // add product (admin) different verification 
 router.post("/addProduct", addProduct)
// get product by Id
router.get("/:productId", jwtVerify, getProductById)

 // delet product (admin)

module.exports = router; 
