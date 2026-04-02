import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import {promisify} from "util"

const protect=async(req,res,next)=>{
    try{
        let token
        if(req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")   
        ){
            token=req.headers.authorization.split(" ")[1]
        }
        if(!token){
            return res.status(401).json({
                status:"fail",
                message:"You are not logged in.Please log in first."
            })
        }
        const  decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        const currentUser=await User.findById(decoded.id)
        if(!currentUser){
            return res.status(401).json({
                status:"fail",
                message:"User no longer exists."
            })
        }
        req.user=currentUser
        next()
    }catch(error){
        console.log("AUTH MIDDLEWARE ERROR:",error)
        return res.status(401).json({
            status:"fail",
            message:"Invalid token or session expired.Please log in again."
        })
    }
}
export default protect