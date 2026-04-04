import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js"
dotenv.config()

const whitelist=[process.env.FRONTEND_URL];
const corsOption={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
            callback(new Error("Not allowed by CORS."))
        }
    },
    credentials:true,
    optionsSuccessStatus:200
}


const app=express()
app.use(express.json())
app.use(cors(corsOption))

const port=process.env.PORT || 5000

app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)


async function main(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB connected")
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    })
}
main().catch(err=>{
    console.log(err)
    process.exit(1)
})
