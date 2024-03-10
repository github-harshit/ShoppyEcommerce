const express= require("express");
const {addProduct, getAllProducts, removeProduct, updateProduct} = require("../controllers/cartController"); 
const {jwtVerify} = require("../middlewares/verify"); 


const router = express.Router();
router.post("/addProduct", jwtVerify, addProduct); 
router.delete("/remove/:id", jwtVerify, removeProduct)
router.get("/:id", getAllProducts); 
router.put("/update/:id",jwtVerify, updateProduct);
module.exports = router; 