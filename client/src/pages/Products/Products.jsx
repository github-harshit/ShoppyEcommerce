import React, {useState, useEffect} from 'react'
import axios from "../../utils/api/axios"; 
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
const Products = () => {
     const [products, setProducts] = useState([]); 
       
     const location = window.location.pathname.split("/")[2]; 
    const token = useSelector((state)=> state.auth.token); 
    console.log(token); 
      useEffect(()=>{
         const getProducts = async()=>{
           const res = await axios.get(`/products/category/${location}`)
           setProducts(res?.data?.products); 

         }
         getProducts(); 

      }, [])
   
    
  return (
    <div className='flex flex-col gap-5 py-10'>
      <div className='px-10 mb-3'>
         <h1 className='text-2xl font-bold '> {location} Collections </h1>
      </div>
     
      <div className='flex  items-center flex-wrap gap-10 px-10'>
        {products.map((product, index)=>
         <Link key={index} to = {`/products/${product._id}`}><div className='w-[20rem] h-[20rem] flex flex-col items-center bg-violet-50 hover:opacity-90 '> 
            <div className='w-full h-[15rem] '> 
            <img src={product.img} className='w-full h-full object-contain' />
            </div>
            <div className='w-full flex flex-col items-center'>
                 <h4>{product.title}</h4>
            <p> {product.desc}</p>
            <h3 className='font-bold'>{product.price} Rs</h3>
            </div>
         

         </div></Link>

        )}
      </div>
     
    </div>
  )
}

export default Products