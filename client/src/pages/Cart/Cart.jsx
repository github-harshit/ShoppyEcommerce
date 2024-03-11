import React, {useEffect, useState} from 'react'
import axios from "../../utils/api/axios"; 
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/cartSlice';
import {MenuItem, Select} from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
  console.log("cart component"); 
    const [cartData, setCartData] = useState([]); 
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user); 
    const[total, setTotal] = useState(""); 

    const getProducts = async()=>{
      const res = await axios.get(`/cart/${user._id}`);
     setCartData(res?.data?.cart?.items); 

 }
  useEffect(()=>{
   
     getProducts(); 
  },[] );
   useEffect(()=>{
     findTotal(); 
   }, [cartData])
  const findTotal =()=>{
    
      let total = 0; 
       for(let i =0; i<cartData.length; i++){ 
        let item  = cartData[i]; 
        let price = item.product.price*item.quantity; 
        total+=price; 
       }
        setTotal(total); 
      
  }
  const handleChange = async (event, id)=>{

    const res = await axios.put(`/cart/update/${id}`, {
       quantity: event.target.value
    }); 
    getProducts(); 


  }
   const handleRemove = async (id)=>{
    dispatch(removeProduct(1)); 
     const res = await axios.delete(`/cart/remove/${id}`); 
    
    if(res.data.status==201){
   
        const updatedRes = await axios.get(`/cart/65e96acf2c73d3e49441bc82`);
        setCartData(updatedRes?.data?.cart?.items);
    }

  
   }
   const handleCheckout = async()=>{
     const stripe = await loadStripe("pk_test_51NiYu1SII5NT03lNflTFzlrH8Tl07fO2cGNZEGbS4d36VbjMRrbPgqARqzxiiXvAOtlJVmIo2YMreU9ch7i1Fm8Q00De3KOTjH");
      const result = await axios.post(`/order/checkout`, {cartData:cartData} ); 
      console.log(result)
      
      stripe.redirectToCheckout({
         sessionId: result.data.sessionId
      }); 
      
   }  
  return (
    <div >{cartData.map((item, index)=> 
     <div className='px-10 ' key={index}>
     
    <div className='flex mb-4 ' > 
    
     <div className='w-[40%] flex items-center justify-center py-5'>
        <img className= "w-40 h-50 object-contain " src={item.product.img}/>
     </div>
     <div className='w-[60%] flex flex-col gap-2 py-5'>
        <h2 className='font-semibold text-md'>{item.product.title}</h2>
        <p>{item.product.desc}</p>
        <h2 className='font-semibold text-md'>{item.product.price} Rs</h2>
        <div className='flex gap-3'>
          <div> Qty: <Select label= "Qty"
          sx={{height: "2rem"}}
          value={item.quantity}
          onChange={(event)=> handleChange(event, item.product._id)}
               
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            </Select> </div>
         <div onClick={()=> handleRemove(item.product._id)} className='cursor-pointer flex items-center gap-1'> Remove <MdOutlineDelete  size={"1.3rem"}  /> </div>
         <div className='cursor-pointer flex items-center gap-1'>Save for later <CiHeart size={"1.3rem"}/> </div>
        </div>
     </div>
    
   
     </div>
     <hr/>
    </div>)}
     <div className='flex flex-col items-center gap-2'>
    <p className='text-lg font-semibold'> Total Amount : {total}</p> 
    <button onClick={handleCheckout}  className=' border border-black py-3 px-6 flex items-center gap-2'> Place Order</button>
     </div>
    </div>
  )
}

export default Cart