import Select from "react-select"; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"; 
import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/userSlice";
import {toast} from "react-toastify"; 
const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]
const SignUp = () => {
   const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const token  = useSelector((state)=> state.auth.token);

    const[formData, setFormData] = useState({
        firstName: "", 
        lastName: "",
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "", 

    });

    useEffect(()=>{
        if(token){
           navigate("/")
        }
    })
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null); 
    const handleFormChange = (event)=>{
    setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    const handleDateChange = (date) => {
       
        setSelectedDate(date);
        console.log(date); 
      };
      const handleGenderChange = (gender)=>{
        setSelectedGender(gender); 
      }

    const handleSubmit = (event)=>{
      event.preventDefault(); 
    
        const data = {...formData, 
                      ["gender"] : selectedGender.value, 
                      ["dob"] : selectedDate
        }
      axios({
        method: 'post', 
        url: "http://localhost:5000/user/signUp", 
        data: data, 
        headers: {
          "Content-Type": "application/json"
        }

      }).then((response)=>{
        if(response.status===200){
          if(response.data.status==200){
             localStorage.setItem('token', response.data.token); 
             dispatch(setToken(response.data.token)); 
             dispatch(addUser(response.data.user)); 
             console.log("Successful"); 
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
      })
      .catch((err)=> console.log(err)); 


    }


  return (
    <div className='w-full flex py-20'>
    <div className='w-full md:w-[70%] lg:w-[50%]  flex flex-col items-center gap-3 '>
    <h1 className='font-bold text-4xl'>New Account</h1>
    <p className='font-normal'> Already have an account? <Link to={"/signin"}><span className='text-violet-400 cursor-pointer'>Sign In</span> </Link> </p>
     <form onSubmit={handleSubmit} className='flex flex-col w-[80%] md:w-[60%] items-center  gap-3 '>
       <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
          type='text'
          placeholder='FIRST NAME'
          name="firstName" 
          value={formData.firstName} 
          onChange={handleFormChange}/>
        <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
           type='text'
           placeholder='LAST NAME' 
           name="lastName" 
           value={formData.lastName}
           onChange= {handleFormChange}/>
           
        <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
            type='text'
            placeholder='USERNAME' 
            name="username" 
            value={formData.username}
            onChange={handleFormChange}/>
        <input className='border border-black text-black w-full p-1.5  rounded shadow-sm shadow-black'
            type='email' 
            placeholder= "EMAIL" 
            name="email" 
            value={formData.email}
            onChange={handleFormChange}/>
        <input className='border border-black text-black w-full p-1.5  rounded shadow-sm shadow-black' 
            type='password' 
            placeholder='PASSWORD' 
            name="password" 
            value={formData.password}
            onChange={handleFormChange}/>
        <input className='border border-black text-black w-full p-1.5 rounded shadow-sm shadow-black'
            type='password' 
            placeholder='CONFIRM PASSWORD'
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleFormChange}/>
        <div className="w-full flex gap-3">

         <DatePicker className="border  py-2 shadow-sm rounded shadow-black w-[90%]"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        showIcon
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showTimeSelect= {false}
        popperPlacement="bottom-end"
        placeholderText="   date of birth" 
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '0,10', 
          },
        }}
      />
           <Select placeholder= "Gender" options={options} className="w-[50%]" onChange={handleGenderChange} /> 
         </div>
        <button type="submit" className="bg-black text-white w-full py-2 rounded cursor-pointer" >Create an Account</button>
        
     </form>

    </div>
    <div className='w-0 md:w-[50%] h-[75vh]  ' >
       
    </div>

    </div>
  )
}

export default SignUp