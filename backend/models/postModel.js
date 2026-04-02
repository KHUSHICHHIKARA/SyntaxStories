import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A post must have a title.'],
        trim:true
    },
    markdownContent:{
        type:String,
        required:[true,'A post must have content.']
    },
    author:{
        type:String,
        default:'Admin'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post=mongoose.model('Post',postSchema)
export default Post