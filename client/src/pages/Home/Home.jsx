
import { useEffect, useRef } from "react";
import { register } from 'swiper/element/bundle';
import slide1 from "../../assets/images/slide1.jpg"; 
import slide2 from "../../assets/images/slide2.jpg";
import Categories from "../../components/Categories/Categories"
const Home = () => {
    
     useEffect(() => {
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