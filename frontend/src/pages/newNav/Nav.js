import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { CgMenu, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AtgLogo from "./AtgLogo.svg"

const Navbar = ({currentMenu}) => {
  const user = useSelector((state) => state);
  const userHistory = JSON.parse(localStorage.getItem("On-Campus"));
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  localStorage.setItem("lastUrl", JSON.stringify(window.location.pathname)); 


  return ( 
    <nav className={`navbar ${showMenu ? "showMobileNav" : ""}`}>
        <div className="sidebar"></div>
      <div className="logo">
      <Link to={"/"}><img src={AtgLogo} alt="Logo" /></Link>
      </div>
      {/* <h1 style={{color:"white"}} onClick={()=>window.location.href = "/dashboard"}>{window.location.pathname==='/dashboard'?'DashBoard': <><i class="fa-solid fa-backward"></i> Back to Dashboard</>}</h1> */}

      <input className="searching" placeholder="Search for your favorite groups in ATG" type="search" />

      {user.details===true?
        <p>Create account. <a href="/login">It’s free!</a></p>
      :
      
      <div className="profile">
         <i style={{color:"white",fontSize:"25px",marginRight:"80px"}} class="fa-solid fa-bell"></i>
      <div className="ProfileImage">
        <img src={user.details.profilePicture} alt="" />
        
        <div  className="UserOptions">
          <p   onClick={()=>{localStorage.clear('On-Campus');window.location.href = "/login"}}>Log out</p>
          
        </div>
      </div>
      <p>{user.details.username}</p>
      
      </div>
      }
      <div className="mobileMenuBtn">
        <CgMenu
          className="mobileMenuIcon openMenuIcon"
          onClick={() => setShowMenu(true)}
        />
        <CgClose
          className="mobileMenuIcon closeMenuOutline"
          onClick={() => setShowMenu(false)}
        />
        
      </div>
    </nav>
  );
};

export default Navbar;
