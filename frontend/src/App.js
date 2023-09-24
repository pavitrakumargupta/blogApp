import { useEffect, useState } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { actionCreators } from "./state/index";
import UseVerifyAuth from "./verifyAuth";

import Loader from "./assets/loader.webp"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./pages/newNav/Nav";
import Blog from "./pages/Blogs/Blog"
import ProfilePage from "./pages/profilePage/profilePage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

function App() {

  const [userSetDone,setUserSetDone]=useState(false)

  const dispatch = useDispatch();
 

  // Custom hook for verifying auth
  useEffect(()=>{
  },[userSetDone])
  useEffect(()=>{setUserDetails()},[])
  

  const setUserDetails=async()=>{
    const data=await UseVerifyAuth();
    await dispatch(actionCreators.setUserDetails(data));
    if(data._id){
      setUserSetDone(true)     
    }else if(data===true){
      setUserSetDone(true)
    }
    console.log(data);
  }
 

  if(!userSetDone){
    return <div style={{
      position:"absolute",
      width:"100vw",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <img src={Loader} alt="" />
    </div>
  }else{
    return <Router>
    <Routes>
        <Route path="/login" element={<div className="page"><Login /></div>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/"  element={<div className="page"><Navbar currentMenu={"blogs"} />  <Blog/></div>}></Route>
    </Routes>
  </Router>
  }
  
}

export default App;
