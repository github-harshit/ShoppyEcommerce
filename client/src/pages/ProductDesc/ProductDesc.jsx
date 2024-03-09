import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'; 
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "../../utils/api/axios";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
const ProductDesc = () => {
   const dispatch = useDispatch(); 
  const[productData, setProductData] = useState({
      title: '',
      desc: '', 
      img: "", 
      size: [], 
      color:[], 
      price:"", 
      _id: ""
      
  }); 

  const location = useLocation(); 
  const id = location.pathname.split("/")[2]; 
   const handleAdd = async(id)=>{
  
     const data = await axios.post(`/cart/addProduct`, {
       productId: id, 
       quantity:1
     })
     dispatch(addProduct(1)); 
     

   }
    
  useEffect(()=>{
     const getProductData = async()=>{
        const res = await axios.get(`/products/${id}`); 
        setProductData(res?.data?.product); 


     }
      getProductData(); 
  }, [])
  return (
    <div className='flex gap-5 py-10'> 
      <div className='w-[60%]'>
        <div className='w-[80%] h-[80vh] mx-auto'>
          <img className='w-full h-full object-contain' src={productData.img}/>
        </div>
      </div>
      <div className='w-[40%] flex flex-col gap-5'>
         <h1 className='font-bold text-3xl'>{productData.title}</h1>
         <h2 className='font-semibold text-2xl' >{productData.desc}</h2>
         <h3 className='font-semibold'>Rs {productData.price}</h3>
         <div className='flex flex-col gap-2'>
           <h3> Select Size</h3> 
           <div className='flex gap-4'>
          
           { productData.size.map((size)=> <div className='w-10 h-10 rounded-full border border-black flex items-center justify-center' key={size}> {size} </div>)}
         </div>
         </div>
         <div className='flex flex-col gap-2'>
           <h3> Select Color</h3> 
           <div className='flex gap-4'>
          
           { productData.color.map((color)=> <div className={`w-10 h-10 rounded-full border border-black flex items-center justify-center `} key={color}> {color} </div>)}
         </div>
         </div>
        
        
         <div>

         </div>
         <div className='flex gap-10'>
           <button onClick={()=> handleAdd(productData._id)} className=' border border-black py-3 px-6 flex items-center gap-2'  > <FaCartPlus /> ADD TO CART</button>
           <button  className=' border border-black py-3 px-6 flex items-center gap-2'> <FaHeart /> WISHLIST</button>
         </div>
      </div>
     
        
    </div>
  )
}

export default ProductDesc