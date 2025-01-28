export const authorizeAdmin = (req, res, next) => {
    
    if (req.user.email !== "admin@ex.com") {
      return res.status(403).json({
        message: "Only admin allowed.",
      });
    }
    next();  
  };