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
        type:String,
        default:'Admin'
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
postSchema.pre("save",function(){
    if(this.isModified("title")){
        this.slug=slugify(this.title,{lower:true,strict:true})
    }
})

const Post=mongoose.model('Post',postSchema)
export default Post