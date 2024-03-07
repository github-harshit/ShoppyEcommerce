const express= require("express");
const {addProduct, getAllProducts, removeProduct} = require("../controllers/cartController"); 
const {jwtVerify} = require("../middlewares/verify"); 


const router = express.Router();
router.post("/addProduct", jwtVerify, addProduct); 
router.delete("/remove/:id", jwtVerify, removeProduct)
router.get("/:id", getAllProducts); 
module.exports = router; 