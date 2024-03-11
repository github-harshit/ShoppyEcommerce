const userRouter = require("./routes/userRoute");
const productRouter  = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const express = require("express"); 
const app = express(); 
const port = 5000; 
 const cors = require("cors"); 
const mongoose  = require("mongoose"); 
const dotenv = require("dotenv");
const orderRoute = require("./routes/orderRoute") 
dotenv.config(); 

app.use(express.json()); 
app.use(cors()); 
app.use("/user", userRouter); 
app.use("/products", productRouter); 
app.use("/cart", cartRouter);
app.use("/order", orderRoute); 
 

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("MOngoDB connected"))
.catch((err)=> console.log(err))
app.listen(port, ()=>{
     console.log("app is listening on port", port)
})