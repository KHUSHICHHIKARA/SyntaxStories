import { useState,useEffect } from "react";
import axios from "axios";
import PostListItem from "../components/PostListItem";

function HomePage() {

    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/posts");
                setPost(res.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch posts.Please try again later");
                console.log("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div>Loading posts...</div>;

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    return (
        <div>
            <h1>Posts</h1>
            {posts.length === 0 ? (
                <p>No post yet.Be the first to create one!</p>
            ) : (
                <div className="post-list">
                    {posts.map(post => (
                        <PostListItem key={post._id} post={post}></PostListItem>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;