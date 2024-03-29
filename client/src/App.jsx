import {Routes, Route, BrowserRouter} from "react-router-dom"; 
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
 import Admin from "./pages/Admin/Admin";
 import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {ToastContainer} from "react-toastify"; 
 import Success from "./pages/Payment/Success/Success";
 import Failure from "./pages/Payment/Failure/Failure";
import 'react-toastify/dist/ReactToastify.css';
import ProductDesc from "./pages/ProductDesc/ProductDesc";
function App() {
   
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path="/signup" element= {<SignUp/>}/>
        <Route path="/signin" element ={<SignIn/>}/>
         <Route path="/admin" element= {<Admin/>}/>
         <Route path="/" element= {<PrivateRoute/>}>
           <Route path="" element= {<Home/>}/>
            <Route path="/categories/:category" element = {<Products/>}></Route>
            <Route path="/products/:productId" element= {<ProductDesc/>}/>
            <Route path="/cart" element= {<Cart/>}/>
         </Route>
         <Route path="/payment">
          <Route path="success" element={<Success/>} ></Route>
          <Route path="failure" element= {<Failure/>}></Route>
         </Route>
       </Routes>
       <ToastContainer/> 
       </BrowserRouter>
    </>
  )
}

export default App
