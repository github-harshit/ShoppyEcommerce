import  {useState, useEffect} from 'react'; 
import axios from "axios"; 
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/authSlice';
 import { useNavigate } from 'react-router-dom';
 import {toast} from "react-toastify"; 
  import { Link } from 'react-router-dom';
const SignIn = () => {
   const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const token  = useSelector((state)=> state.auth.token);

  const[formData, setFormData] = useState({
    email: "", 
    password: ""
  });
  useEffect(()=>{
    if(token){
       navigate("/")
    }
})
  const handleChange = (event)=>{
     setFormData({...formData, [event.target.name]: event.target.value})
  }
   const handleSubmit = (event)=>{
     event.preventDefault(); 
    axios({
      method: "post", 
      url: "http://localhost:5000/user/signIn", 
      data: formData, 
      headers : {
        "Content-Type" : "application/json"
      }
    }).then((response)=>{
       if(response.status===200){
        if(response.data.status==200){
    
          localStorage.setItem('token', response.data.token); 
          dispatch(setToken(response.data.token));
          console.log("Am I here ")
          navigate("/");  
        
        }else{
          
          toast.error(response.data.msg, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar:false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log(response.data.msg)
        }

        
       }
    }).catch((err)=>console.log(err)); 

    

     
   }
  return (
    <div className='flex py-20'>
    <div className='w-full md:w-[50%] flex flex-col gap-3 items-center py-20 '>
    <h1 className='font-bold text-4xl mb-2'> Welcome Back ! </h1>
     <h2 className='font-bold text-2xl mb-2'> Continue your journey </h2>
     <p className='font-normal'> {"Don't have an account"} <Link to={"/signup"}><span className='text-violet-400 cursor-pointer'>Sign Up</span> </Link> </p>
      <form onSubmit={handleSubmit} className='flex flex-col w-[80%] md:w-[60%] items-center  gap-3' >
        <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
         type='text'
         name='email'
         value={formData.email}
         placeholder='EMAIL'
         onChange={handleChange}/>

         <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
          type='password'
          name= "password"
          value={formData.password}
          placeholder='PASSWORD'
          onChange={handleChange}/>

          <button className= "bg-black text-white w-full py-2 rounded">Login </button>
      </form>
    </div>
    <div>

    </div>
    

    </div>
  )
}

export default SignIn