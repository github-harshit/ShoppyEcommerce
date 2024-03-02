import React from 'react'; 
import menFashion from "../../assets/images/menFashion.jpg"; 
import womenFashion from "../../assets/images/womenFashion.jpg"; 
import kidsFashion from "../../assets/images/kidsFashion.jpg"
import { Link } from 'react-router-dom';
const Categories = () => {
  return (
    <div className='w-full h-[27rem] border border-black' >
        <div className='w-full h-full flex gap-2 px-2' >
            <div className='w-1/3 flex justify-center items-center opacity-80' style={{background: `url(${menFashion})`,backgroundSize: "cover",}} >
                 <div className='opacity-100  flex flex-col items-center gap-3 '>
                 <h2 className='text-4xl font-bold '>{"Men's Fashion"}</h2>
                 <Link to="/categories/Men" > <button className='border border-black cursor-pointer bg-black text-white w-[8rem] rounded-sm h-9' > Explore More</button></Link>
                  </div>
                  
                  </div>
            <div className='w-1/3  flex justify-center items-center opacity-80' style={{backgroundImage:`url(${womenFashion})`, backgroundSize: 'cover'}} >
            <div className='opacity-100  flex flex-col items-center gap-3 '>
                 <h2 className='text-4xl font-bold '>{"Women's Fashion"}</h2>
                 <Link to="/categories/Women" ><button className='border border-black cursor-pointer bg-black text-white w-[8rem] rounded-sm h-9' > Explore More</button></Link>
                  </div> </div>
            <div className='w-1/3  flex justify-center items-center opacity-80' style={{backgroundImage: `url(${kidsFashion})`, backgroundSize: "cover"}}>
            <div className='opacity-100  flex flex-col items-center gap-3 '>
                 <h2 className='text-4xl font-bold '>{"Kid's Fashion"}</h2>
                  <Link to= "/categories/Children"> <button className='border border-black cursor-pointer bg-black text-white w-[8rem] rounded-sm h-9' > Explore More </button></Link>
                  </div> </div>
        </div>
    </div>
  )
}

export default Categories; 