import mongoose from "mongoose"
import slugify from "slugify";
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    slug:{
        type:String,
        unique:true,
    },
    categories:{
        type:[String],
        default:[],
    },
},{timestamps:true})
postSchema.pre("save",function(next){
    if(this.isModified("title")){
        this.slug=slugify(this.title,{lower:true,strict:true})
    }
    next()
})

const Post=mongoose.model('Post',postSchema)
export default Post