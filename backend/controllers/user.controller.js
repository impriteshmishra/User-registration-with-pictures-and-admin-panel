import { User } from "../models/user.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js"


export const register = async (req, res) => {
   
    const { name, username } = req.body;
    // const image = req.files;

    // console.log("files",image);
    // console.log("name, handle", name, username);
    try {
        const imageUrls = [];

        for (const image of req.files) {
            const optimizedImageBuffer = await sharp(image.buffer)
                .resize({ width: 200, height: 200, fit: 'inside' })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();
        
            const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
            const cloudeResponse = await cloudinary.uploader.upload(fileUri);
        
            imageUrls.push(cloudeResponse.secure_url); 
        }
        // console.log(imageUrls);
        
        const userObj = {
            name,
            username,
            images:imageUrls,
        };
        // console.log("user object", userObj);
        const user = await User.create(userObj);
        // console.log("user", user);
        return res.status(201).json({
            message:"user registerd",
            success:true,
            data:user
        })
        
    }
    catch (error) {
        console.log(error);

    }
}