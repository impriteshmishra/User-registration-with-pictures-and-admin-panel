
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UserForm from "./pages/UserForm";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from './pages/AdminDashboard';
import User from "./pages/User";




function App() {
  // console.log(import.meta.env.VITE_APP_URL_BACKEND);
  

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<UserForm/>}/>
    <Route path="/adminLogin" element={<AdminLoginPage/>}/>
    <Route path="/adminDashboard" element={<AdminDashboard/>}/>
    <Route path="/adminDashboard/User/:id" element={<User/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
