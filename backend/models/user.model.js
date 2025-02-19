import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true},
    images:{type:[String], required:true},
},{timestamps:true});

export const User = mongoose.model('User',userSchema);