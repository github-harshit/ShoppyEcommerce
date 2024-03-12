import React from 'react'
import success from "../../../assets/images/success.jpg"; 
import { Paper } from '@mui/material';
const Success = () => {
  return (
     <div className=' h-[100vh] flex justify-center items-center border border-red-200'>
        <Paper elevation= {2} className="flex flex-col w-[40%] h-[40%]  items-center gap-5" > 
      <img className='w-[4rem] h-[4rem] object-contain' src={success}/>
      <h1 className='text-xl font-bold'> Your Order is Confirmed!</h1>
      <h3>We will send you a shipping confirmation email as soon as your order ships </h3>
      <button   className=' border border-black py-3 px-6 flex items-center gap-2'> Check Status</button>
    </Paper>
     </div>
  
  )
}

export default Success