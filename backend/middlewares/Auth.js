import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    console.log("token", token);
    
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    }

    req.user = decoded;  
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong during authentication." });
  }
};

export default isAuthenticated;
