import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(express.json())
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js"

app.use(cors())

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
