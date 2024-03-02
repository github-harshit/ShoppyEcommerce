
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';



const PrivateRoute = () => {
  const token  = useSelector((state)=> state.auth.token);
  return (
    <> 
    <Navbar/>
    {token ?  <Outlet/> :  <Navigate to="/signin"/>}
    </> 
   
    
  )
}

export default PrivateRoute