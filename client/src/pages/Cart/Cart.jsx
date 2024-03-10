import React, {useEffect, useState} from 'react'
import axios from "../../utils/api/axios"; 
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/cartSlice';
import {MenuItem, Select} from "@mui/material"
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
  return (
    <div className='py-5 px-5 '>{cartData.map((item, index)=> <div className='flex ' key={index}> 
    
     <div className='w-[40%] flex items-center justify-center'>
        <img className= "w-40 h-50 object-contain border border-black" src={item.product.img}/>
     </div>
     <div className='w-[60%] flex flex-col gap-2'>
        <h2>{item.product.title}</h2>
        <p>{item.product.desc}</p>
        <h2>{item.product.price} Rs</h2>
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
         <div onClick={()=> handleRemove(item.product._id)}> Remove </div>
         <div>Save for later </div>
        </div>
     </div>
    
   
   
    </div>)}
     <div>
       Total : {total}
     </div>
    </div>
  )
}

export default Cart