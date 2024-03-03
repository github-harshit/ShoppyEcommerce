import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
const ProductDesc = () => {
  const[productData, setProductData] = useState(""); 

  const location = useLocation(); 
  const id = location.pathname.split("/")[2]; 
  useEffect(()=>{
     const getProductData = async()=>{
        const res = await axios.get(`http://localhost:5000/products/${id}`); 
        setProductData(res?.data?.product); 


     }
      getProductData(); 
  }, [])
  return (
    <div>
      <h1>{productData.title}</h1>
      <h2>{productData.desc}</h2>
        
    </div>
  )
}

export default ProductDesc