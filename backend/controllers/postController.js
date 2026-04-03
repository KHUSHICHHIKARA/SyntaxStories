import Post from '../models/postModel.js'
const createPost=async(req,res)=>{
    try{
        const {title,markdownContent,author}=req.body
        if(!title || !markdownContent){
            return res.status(400).json({message:'Please provide a title and content for the post.'})
        }
        const newPost=await Post.create({
            title,
            markdownContent,
            author
        })

        res.status(201).json(newPost)
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Error creating post',error:error.message})
    }
}

const getAllPost=async(req,res)=>{
    try{
        const posts=await Post.find({}).sort({createdAt:-1})
        res.status(200).json(posts)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error fetching posts',error:error.message})
    }
}
const getPostBySlug=async (req,res) => {
    try{
        const post=await Post.findOne({slug:req.params.slug})
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message:'Post not found'})
        }
    }catch(error){
        console.log(error)
        if(error.name==='CastError'){
            return res.status(400).json({message:`Invalid ID format: ${req.params.id}`})
        }
        res.status(500).json({message:'Error fetching post',error:error.message})
    }
}
const updatePost=async(req,res)=>{
    try{
        const updatedPost=await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        )
        if(updatedPost){
            res.status(200).json(updatedPost)
        }else{
            rs.status(404).json({message:'Post not found'})
        }
    }catch(error){
        console.log(error)
        if(error.name=='CastError'){
            return res.status(400).json({message:`Invalid ID ${req.params.id}`})
        }
        if(error.name=='ValidationError'){
            return res.status(400).json({message:'Validation Error',error:error.message})
        }
        res.status(500).json({ message: 'Error updating post', error: error.message })
    }   
}
const deletePost=async (req,res) => {
    try{
        const deletedPost=await Post.findByIdAndDelete(req.params.id)
        if(deletedPost){
            res.status(200).json({message:'Post deleted.'})
        }else{
            res.status(404).json({message:'Post not found'})
        }
    }catch(error){
        console.log(error)
        if(error.name==='CastError'){
            return res.status(400).json({message:`Invalid id ${req.params.id}`})
        }
        res.status(500).json({message:'Error deleting post',error:error.message})
    }
}
export{
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}