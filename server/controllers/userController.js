const User = require("../models/userModel"); 
 const bcrypt = require("bcrypt"); 
 const jwt = require("jsonwebtoken"); 
 const Cart = require("../models/cartModel"); 
 
const signUp = async (req, res)=>{
     try{
        const {username, password, confirmPassword, email, gender, dob} = req.body; 
         

         if(password!==confirmPassword){
            return res.json({
                status:401, 
                msg: "Password and Confirm Password does not match"
            })
         }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user  = new User({username, 
                               password: hashedPassword,
                               confirmPassword, 
                               email, 
                               gender, 
                               dob
                            }); 
        const savedUser =  await user.save(); 
        let cart  = await Cart.findOne({userid: savedUser.id}); 
        if(!cart){
             let newCart = new Cart({userId: savedUser.id, items: []});
             await newCart.save(); 
        }
        const payload = {user:savedUser.id}; 
        const token = jwt.sign(payload,process.env.JWT_SECRET ); 


            return res.json({
                status:200, 
                msg: "Everthing is okay", 
                user: savedUser, 
                token: token
            })
         
     }catch(err){
         const errMsg = err.toString(); 
         return res.json({
            status: 501, 
            msg: errMsg
         })
     }
    
}

const signIn = async(req, res)=>{
     try{
     
    const {email, password}= req.body; 
    


     const user = await User.findOne({email:email}); 
      if(!user){
        return res.json({
             status: 401, 
             msg: "Username does not exist"
        })
      }
      const auth = await bcrypt.compare(password, user.password); 
     

     if(!auth){
        return res.json({
            status: 401, 
            msg: "Incorrect passowrd and Username "
        })

     }
     const payload = { user: user.id };
     let cart  = await Cart.findOne({userId: user.id}); 
     if(!cart){
          let newCart = new Cart({userId: user.id, items: []});
          await newCart.save(); 
     }
     
    const token  = jwt.sign(payload, process.env.JWT_SECRET) ;


    return res.json({
        status:200, 
        msg: "Everthing is okay", 
        user: user, 
        token: token
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
    signUp, 
    signIn
 }