const jwt = require("jsonwebtoken"); 

const jwtVerify = (req, res, next)=>{
     // how do we get token from frontend in req.headers right why do I keep forgetting that 
     const authheader = req.headers.authorization;
    
     if(!authheader){
         return res.json({
             status:401, 
             msg : "There is no authentication token "
         })
     }
     const token = authheader.split(" ")[1]; 
     try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET); 
         console.log("decoded", decoded); 
         req.user = decoded.user; 
         next(); 
     }catch(err){
        console.log(err); 
        const errMsg = err.toString(); 
        return res.json({
            status: 501, 
            msg: errMsg
        })
         
         
     }
}
module.exports = {
     jwtVerify
}