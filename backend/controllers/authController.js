import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

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
        const payload ={id:user._id}
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        })
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
export default login;
