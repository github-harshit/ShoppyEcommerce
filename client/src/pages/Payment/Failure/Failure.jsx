import React from 'react'
import { Paper } from '@mui/material';
 import failure from "../../../assets/images/failure.png"
const Failure = () => {
  return (
    <div className=' h-[100vh] flex justify-center items-center border border-red-200'>
    <Paper elevation= {2} className="flex flex-col w-[40%] h-[40%]  items-center gap-5" > 
  <img className='w-[6rem] h-[6rem] object-contain' src={failure}/>
  <h1 className='text-xl font-bold'> Something went wrong !</h1>
  <h3>We could not place your order. We will confirm you what happpend soon  </h3>
  <button   className=' border border-black py-3 px-6 flex items-center gap-2'> Back to Cart </button>
</Paper>
 </div>
  )
}

export default Failure