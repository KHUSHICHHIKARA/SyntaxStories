import Post from '../models/postModel.js'
const createPost=async(req,res)=>{
    try{
        const {title,markdownContent,categories,author}=req.body
        if(!title || !markdownContent){
            return res.status(400).json({message:'Please provide a title and content for the post.'})
        }
        const newPost=await Post.create({
            title,
            markdownContent,
            categories,
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
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const skip=(page-1)*limit;

        const totalPosts=await Post.countDocuments();

        const posts=await Post.find({})
                    .sort({createdAt:-1})
                    .skip(skip)
                    .limit(limit);

        res.status(200).json({
            posts,
            currentPage:page,
            totalPages:Math.ceil(totalPosts/limit),
            totalPosts
        });
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
const getPostByCategory=async(req,res)=>{
    try{
        const categoryName=req.params.categoryName;
        const posts=await Post.find({categories:categoryName}).sort({createdAt:-1});
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json({message:"Error fetching post by category.",error:error.message});
    }
}
const updatePost=async(req,res)=>{
    try{
        const {title,markdownContent,categories}=req.body;
        const updatedData={title,markdownContent,categories};
        const updatedPost=await Post.findOneAndUpdate(
            {slug:req.params.slug},
            updatedData,
            {
                returnDocument:"after",
                runValidators:true
            }
        )
        if(updatedPost){
            res.status(200).json(updatedPost)
        }else{
            res.status(404).json({message:'Post not found'})
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
    getPostBySlug,
    updatePost,
    deletePost,
    getPostByCategory,
}