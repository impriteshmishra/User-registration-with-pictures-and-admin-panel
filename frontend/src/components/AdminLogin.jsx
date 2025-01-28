import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate("/");
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setErrorMessage('Email and password are required.');
      return;
    }
    try {
      const response = await axios.post("https://userdetailsregistered-viewbyadmin-backend.onrender.com/api/v1/admin/login", {
        email,
        password,
       },{
        withCredentials:true,
       })
       console.log(response.data);
       
      alert(response.data.message);
      navigate("/adminDashboard")
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
       
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <span className='text-blue-400 cursor-pointer font-semibold' onClick={handleNavigate} >Back to User Form.</span>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
