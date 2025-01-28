import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

const ADMIN_EMAIL="admin@ex.com";
const ADMIN_PASSWORD="Admin1234";

export const login = async (req,res)=>{
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message:"Email and password is required."})
    }
    if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
      const token = jwt.sign({email},process.env.JWT_KEY, {expiresIn:'1h'});
      return res.status(200).json({
        message:"Admin login successfully",
        token,
      })
    }

  } catch (error) {
    console.log(error);
    
  }
}

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      
    }
  };
  

export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  };