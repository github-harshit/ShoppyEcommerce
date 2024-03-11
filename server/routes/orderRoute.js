const express= require("express");
const  { handleCheckout } = require( "../controllers/orderController");

const router = express.Router();
router.post("/checkout", handleCheckout); 
module.exports = router; 