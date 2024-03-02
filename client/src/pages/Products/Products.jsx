import React, {useState, useEffect} from 'react'
import axios from "axios"; 
import { useSelector } from 'react-redux';
const Products = () => {
     const [products, setProducts] = useState([]); 
       
     const location = window.location.pathname.split("/")[2]; 
    const token = useSelector((state)=> state.auth.token); 
    console.log(token); 
      useEffect(()=>{
         const getProducts = async()=>{
           const res = await axios.get(`http://localhost:5000/products/${location}`, {
             headers: {
               "Authorization" : `Bearer ${token}`
             }
           })
           setProducts(res?.data?.products); 

         }
         getProducts(); 

      }, [])
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex  items-center flex-wrap gap-10 px-10'>
        {products.map((product, index)=>
         <div key={index} className='w-[20rem] h-[26rem] flex flex-col items-center border border-black'> 
            <div className='w-full h-[20rem]'> 
            <img src={product.img} className='w-full h-full object-contain' />
            </div>
            
            <h4>{product.title}</h4>
            <p> {product.desc}</p>
            <h3 className='font-bold'>{product.price} Rs</h3>

         </div>

        )}
      </div>
     
    </div>
  )
}

export default Products