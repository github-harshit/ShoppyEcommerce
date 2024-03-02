import React, {useState} from 'react'
import axios from "axios"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
const Admin = () => {
    const [productData, setProductData] = useState({
        title: "", 
        desc: "", 
        img :"", 
        category: [], 
        size: [], 
        color: [], 
        price: "", 
        inStock: true
     }); 
     const colors = ["Red", 'Yellow', "Blue", "Green", "Grey", "White", 'Pink', "Brown"]; 
     const sizes= ["S", "M", 'L', "XL"]; 
     const categories = ["Men", "Women", "Kids"]; 
     const handleChange = (event)=>{
        console.log("handle Change is called"); 
        console.log(event.target.name); 
        console.log(event.target.value)
         if(event.target.type==="file"){
             setProductData({...productData, [event.target.name] : event.target.files[0]})
         }else{
             setProductData({...productData, [event.target.name] : event.target.value})
         }
     }
     
const submit = async (event)=>{
     event.preventDefault(); 
     console.log(productData); 
    const data = new FormData(); 
   
    data.append("file", productData.img); 
 
    
    data.append("upload_preset","shoppy" ); 
    data.append("cloud_name", "da4alsdtg"); 
    const res = await  axios.post(`https://api.cloudinary.com/v1_1/da4alsdtg/image/upload`, data); 
    console.log(res.data.secure_url);
     if(res.status===200){
      // what is happening is thi setProductData is asunchrnous so before it is etting state api route is hitting 
      // so one solution thatis coming to mymind is make this operation synchronus 
       const updatedProductData = {...productData}; 
      updatedProductData.img = res?.data?.secure_url
        // setProductData({...productData, "img": res?.data?.secure_url});
      
        const response = await axios.post("http://localhost:5000/products/addProduct", updatedProductData);
        console.log(response); 
        if(response.data.status===201){
             alert("Successfully added the product")
        } 
     }
    
     
 }
  return (
  

    <div >
    <form className='flex flex-col gap-5 w-[40%] px-10 py-10 justify-center'>

    <labe>Title</labe>
    <input type='text' className='border border-black' name='title' onChange={handleChange} value={productData.title} />
   <label>Decription</label>
    <input type='text' className='border border-black' name='desc' onChange={handleChange} value={productData.desc} placeholder='description'/>
    <label>Category </label>
    <Select
          name='category'
          multiple
          labelId="demo-multiple-name-label"
          value={productData.category}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
         
        >
          {categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
             
            >
              {name}
            </MenuItem>
          ))}
        </Select>
       

    <label> Size</label>
      <Select
          name='size'
          multiple
          labelId="demo-multiple-name-label"
          value={productData.size}
          onChange={handleChange}
          input={<OutlinedInput label="Size" />}
         
        >
          {sizes.map((name) => (
            <MenuItem
              key={name}
              value={name}
             
            >
              {name}
            </MenuItem>
          ))}
        </Select>
    
     
    <label> Color </label><Select
          name='color'
          multiple
          labelId="demo-multiple-name-label"
          value={productData.color}
          onChange={handleChange}
          input={<OutlinedInput label="Color" />}
         
        >
          {colors.map((name) => (
            <MenuItem
              key={name}
              value={name}
             
            >
              {name}
            </MenuItem>
          ))}
        </Select>
     <label>Price</label>
    <input type='text' className='border border-black' name='price' onChange={handleChange} placeholder='price'/>
    <label>Image</label>
    <input className='border border-black' type= "file" name='img' onChange={handleChange} placeholder='image' ></input>
    <button onClick={submit}>Upload</button> 
    </form>
    </div>
   
    
  )
}

export default Admin