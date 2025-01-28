import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  
    const handleNavigate = ()=>{
      navigate("/adminLogin")
    }
  return (
    <nav className="bg-purple-600 text-white p-4 flex items-center justify-between">
     <h3 className="font-bold text-sm sm:text-xl">User Registeration Form app</h3>
     <button onClick={handleNavigate} className="bg-white text-purple-600 p-2 rounded-full cursor-pointer px-2 sm:px-4 font-semibold">Admin Login</button>
    </nav>
  );
};

export default Navbar;
