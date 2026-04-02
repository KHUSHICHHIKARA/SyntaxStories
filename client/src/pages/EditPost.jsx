import { useState,useEffect } from "react";
import {useNavigate,useParams} from "react-router-dom";
import apiService from "../services/apiService.js";
import "./CreatePost.css";

const EditPost=()=>{
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost=async()=>{
            setLoading(true);
            try{
                const response = await apiService.get(`/posts/${id}`);
                setTitle(response.data.title);
                setMarkdownContent(response.data.markdownContent);
            }catch(err) {
                console.error("Failed to fetch post for editing:", err);
                setError("Failed to load post data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setSubmitting(true);
        setError("");

        if (!title.trim() || !markdownContent.trim()) {
            setError("Title and content are required.");
            setSubmitting(false);
            return;
        }
        try {
            await apiService.patch(`/posts/${id}`, {title,markdownContent});
            navigate("/admin/dashboard");
        }catch(err) {
            console.error("Failed to update post:", err);
            setError(err.response?.data?.message || "Failed to update post. Please try again.");
            setSubmitting(false);
        }
    };

    if(loading){
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</div>;
    }

    return(
        <div className="create-post-page">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    disabled={submitting}
                />
                </div>
                <div className="form-group">
                <label htmlFor="markdownContent">Content (Markdown)</label>
                <textarea
                    id="markdownContent"
                    className="form-control markdown-input"
                    value={markdownContent}
                    onChange={(e)=>setMarkdownContent(e.target.value)}
                    disabled={submitting}
                />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
};
export default EditPost;