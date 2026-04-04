import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema(
    {   username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            select:false
        },
    },
    {timestamps:true}
)
userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return 
    }
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
    }catch(error){
        throw error
    }
})
userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(error){
        throw error
    }
}
const User=mongoose.model("User",userSchema)
export default User
