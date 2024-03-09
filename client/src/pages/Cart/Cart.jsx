import React, {useEffect, useState} from 'react'
import axios from "../../utils/api/axios"; 
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/cartSlice';
const Cart = () => {
    const [cartData, setCartData] = useState([]); 
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user)

  useEffect(()=>{
    const getProducts = async()=>{
         const res = await axios.get(`/cart/${user._id}`);
        setCartData(res?.data?.cart?.items); 

    }
     getProducts(); 
  },[] );
   const handleRemove = async (id)=>{
    dispatch(removeProduct(1)); 
     const res = await axios.delete(`/cart/remove/${id}`); 
     console.log(res.data)
    if(res.data.status==201){
        console.log("Ae we here ")
        const updatedRes = await axios.get(`/cart/65e96acf2c73d3e49441bc82`);
        setCartData(updatedRes?.data?.cart?.items);
    }

  
   }
  return (
    <div>{cartData.map((item, index)=> <div key={index}> 
      <h2>{item.product.title}</h2>
      <h2>{item.product.price}</h2>
      <img className= "w-40 h-50 object-contain" src={item.product.img}/>
      <button onClick={()=> handleRemove(item.product._id)}>Remove from cart </button>
    </div>)}</div>
  )
}

export default Cart