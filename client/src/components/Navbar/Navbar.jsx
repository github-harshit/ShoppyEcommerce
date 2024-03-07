import React, {useState} from 'react'; 
import { useSelector, useDispatch } from "react-redux"; 
import { removeToken } from "../../redux/authSlice";
import search from "../../assets/images/search.png"; 
import logo from "../../assets/images/logo.png"; 
import Popover from '@mui/material/Popover';
import { FaBagShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import {Badge} from "@mui/material";
 import { Link } from 'react-router-dom';

const Navbar = () => {
   const dispatch = useDispatch(); 
   const [anchorEl, setAnchorEl] = useState(); 
      const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
      setAnchorEl(null);
    };
          
  const handleLogout  = ()=>{
    dispatch(removeToken()); 
    localStorage.removeItem("token"); 

}
    const open = Boolean(anchorEl);
  return (
    <div className='w-full h-16 flex justify-between items-center'>
         <div className=' w-1/3 md:w-1/5 h-full flex items-center justify-center gap-3 md:gap-10'>
            <img className=' w-[25%] md:w-[14%] h-[50%] md:h-[70%] object-cover' src={logo} alt='Logo'/>
            <h1 className='font-bold text-xl'> Shoppy </h1>
         </div>
         <div className=' w-[40%] md:w-1/2 '>

         <input
          style={{backgroundImage : `url(${search})`, backgroundSize: "1.4rem", backgroundRepeat: "no-repeat", }}
         className='border w-full md:w-60 lg:w-2/3 px-12 bg-gray-100 outline-none rounded-md '
          type='text'
           placeholder='Search for your favourite products'>
          
         </input>
         </div>
        
        <div className='w-1/5'>
        <ul className='flex justify-center gap-3 md:gap-10 items-center'>
            <Badge badgeContent= {2} color='primary'>
                <Link to={"/cart"}>  <FaBagShopping size={"1.2rem"}/> </Link>
            </Badge>
            <li>
                <Link to= {""}> <FaHeart size={"1.2rem"}/></Link>
            </li>
              <li onClick={handleClick} >
                <a><FaUser size={"1.2rem"}/></a>
            </li>
              <Popover
        
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
            }}
      >
         <div className='w-[15rem] flex flex-col gap-2 p-5 '>
           <p>Orders</p>
           <p>Wishlist</p>
           <p>My Account</p>
           <button className='border border-black w-[5rem] bg-black text-white rounded-sm border-none' onClick={handleLogout}>Logout </button>
         </div>
      </Popover>

        </ul>

        </div>
       
    </div>
  )
}

export default Navbar