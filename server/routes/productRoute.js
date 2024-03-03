const express = require("express"); 
const {jwtVerify} = require("../middlewares/verify"); 
 const {getCategoryProducts, addProduct, getProductById} = require("../controllers/productController"); 

const router = express.Router(); 
// get category products 
 router.get("/category/:category",  getCategoryProducts)
 // add product (admin) 
 router.post("/addProduct", addProduct)
// get product by Id
router.get("/:productId", getProductById)

 // delet product (admin)

module.exports = router; 
