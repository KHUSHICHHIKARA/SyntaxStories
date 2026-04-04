import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import mongoose from "mongoose"
import dotenv from "dotenv"
import User from"./models/userModel.js"

dotenv.config()
const seedAdmin=async()=>{
    try{
        console.log("connecting to db");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to db")

        const existingAdmin=await User.findOne({username:ADMIN_USERNAME})
        if(existingAdmin){
            console.log("Admin already exists")
            return
        }
        console.log("Admin not found.Creating new one...")
        const adminUser=new User({
            username:process.env.ADMIN_USERNAME,
            password:process.ADMIN_PASSWORD
        })
        await adminUser.save()
        console.log('----------------------------------------------------');
        console.log('Admin user created successfully!');
        console.log(`Username: ${ADMIN_USERNAME}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log('You can now use these credentials to log in.');
        console.log('----------------------------------------------------');

    }catch(error){
        console.error('Error during admin user seeding:', error);
    }finally{
        console.log('Disconnecting from database...');
        await mongoose.disconnect();
        console.log('Database disconnected.');
    }
}
seedAdmin()