import { useState } from "react";
import {useNavigate} from "react-router-dom";
import apiService from "../services/apiService.js";
import "./CreatePost.css";

const CreatePost=()=>{
    const [title,setTitle]=useState("");
    const [markdownContent,setMarkdownContent]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setLoading(true);
        setError("");

        if(!title.trim() || !markdownContent.trim()){
            setError("Title and Content are required");
            setLoading(false);
            return;
        }
        try{
            await apiService.post("/posts",{
                title,
                markdownContent,
                author:"Admin"
            });
            navigate("/admin/dashboard");
        }catch(error){
            console.log("Failed to create post: ",error);
            setError(error.response?.data?.message || "Failed to create post.Please try again.");
            setLoading(false);
        }
    };

    return(
        <div className="create-post-page">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Enter post title"
                        disabled={loading} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="markdownContent">Content (Markdown)</label>
                    <textarea className="form-control markdown-input" 
                        id="markdownContent"
                        value={markdownContent}
                        placeholder="Write your post content here using Mardown..."
                        disabled={loading}
                        onChange={(e)=>setMarkdownContent(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading?"Publishing":"Publish Post"}
                </button>
            </form>
        </div>
    )
}

export default CreatePost;