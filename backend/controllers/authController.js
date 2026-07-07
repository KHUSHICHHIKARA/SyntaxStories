import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const generateToken=(userId)=>{
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
const login=async(req,res)=>{
    try{
        const {username,password}=req.body
        if(!username || !password){
            return res.status(400).json({
                status:"fail",
                message:"Please provide username and password."
            })
        }
        const user=await User.findOne({username}).select("+password")
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                status:"fail",
                message:"Invalid Credentials."
            })
        }
        const token=generateToken(user._id);
        res.status(200).json({
            status:"success",
            token
        })
    }catch(error){
        console.log("Login Error:",error);
        res.status(500).json({
            status:"error",
            message:"An internal server error occured."
        })
    }
}
const register=async(req,res)=>{
    try{
        const user=req.body;
        const {username,email,password}=user;
        if(!username || !email || !password){
            return res.status(400).json("Please provide username,email and password.");
        }
        const u=await User.exists({email});
        if(u){
            return res.status(400).json({message:"You are already registered with this email."});
        }
        let newUser=new User(user);
        await newUser.save();
        const token=generateToken(newUser._id);
        res.status(201).json({message:"Registered sucessfully",token});
    }catch(err){
        res.status(400).json({message:"Unable to register.Please try later.",error:err.message})
    }
}
export {
    login,
    register
};
