
import { useEffect, useRef } from "react";
import { register } from 'swiper/element/bundle';
import slide1 from "../../assets/images/slide1.jpg"; 
import slide2 from "../../assets/images/slide2.jpg";
import Categories from "../../components/Categories/Categories"; 
import { setInitialValue } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/api/axios"
const Home = () => {
     const dispatch = useDispatch(); 
     const user = useSelector((state)=> state.user.user);
     console.log(user)
     useEffect(() => {
              
               const getProducts = async()=>{
               const res = await axios.get(`/cart/${user._id}`);
               let arr  = res?.data?.cart?.items; 
               let x = 0;
               for(let i =0; i<arr.length; i++){
               x= x+ arr[i].quantity
               }
               dispatch(setInitialValue(x))
               }
               getProducts();

          register();
       }, []);
    
     //   const swiperElRef = useRef(null);



     
  return (
    <div>
          
          <swiper-container slides-per-view="1" speed="500" loop="true" css-mode="true" pagination = "true" pagination-clickable="true" centered-slides="true"   >
          <swiper-slide >
               <div className= "h-[30rem] max-md:h-[20rem] w-full m-auto"  >
                    <img className="h-full w-full  bg-cover" src={slide1} alt="hjdh"/>
               </div>
          </swiper-slide>
          <swiper-slide>
               <div className="h-[30rem] max-md:h-[20rem] w-full  m-auto">
                    <img className="h-full w-full bg-cover" src={slide2} alt="hjdh"/>
               </div>
          </swiper-slide>
       
          
          </swiper-container>
          <Categories/>

    </div>
    
     
  )
}

export default Home