import React from 'react'

const ProductList = ({products}) => {
  return (
    <div>
         {products.map((product)=>{
             return <div key={product._id}> 
                <img></img>
                 <p>Description</p>
                 <p>Price</p>
             </div>
         })}
    </div>
  )
}

export default ProductList