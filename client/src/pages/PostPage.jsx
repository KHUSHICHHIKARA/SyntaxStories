import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../markdown-styles.css";
import {Helmet} from "react-helmet-async";

const PostPage=()=>{
    const {slug}=useParams();

    const [post,setPost]=useState(null);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchPost=async()=>{
            setLoading(true);
            setError(null);
            try{
                const res=await axios.get(`http://localhost:5000/api/posts/${slug}`);
                setPost(res.data);
            }catch(err){
                setError("Failed to fetch posts.Please try again later");
                console.log("Failed to fetch post :",err); 
            }finally{
                setLoading(false);
            }        
        }
        fetchPost();
    },[slug]);

    const createMetaDescription = (markdown) => {
        if (!markdown) return '';
        const plainText = markdown
        .replace(/!\[.*?\]\(.*?\)/g, '') 
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
        .replace(/[`*#_~]/g, '') 
        .replace(/\s+/g, ' ');
        return plainText.substring(0, 155).trim() + '...';
    };

    if(error){
        return <div style={{color:"red",textAlign:"center",marginTop:"2rem"}}>Error :{error}</div>
    }
    if(loading){
        return <div>Loading post.....</div>
    }
    if(!post){
        return <div>Post not found.</div>
    }
    return(
        <article className="post-full">
            <Helmet>
                <title>{`${post.title} | SyntaxStories`}</title>
                <meta 
                    name="description"
                    content={createMetaDescription(post.markdownContent)}
                />
            </Helmet>
            <h1>{post.title}</h1>
            <div className="post-full-meta">
                <span>by {post.author}</span>
                <br />
                <span>published on {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="post-full-content">
                <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
            </div>
        </article>
    );
};

export default PostPage;