import express, { urlencoded }  from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieparser from "cookie-parser"
import connectDB from "./utils/database.js";
import userRoute from "./routes/user.route.js"
import adminRoute from "./routes/admin.route.js"



dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hey from backend.",
        success: true
    })
})


//middleware
app.use(express.json());
app.use(cookieparser());
app.use(urlencoded({extended:true}));


app.use(cors({
    origin: 'https://userdetailsregistered-viewbyadmin-aubk.onrender.com',
    credentials: true
}));

//here api call
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen from ${PORT}`);
})
