import { useState,useEffect } from "react";
import PostListItem from "../components/PostListItem";
import "./HomePage.css";
import apiService from "../services/apiService.js";
import {Helmet} from "react-helmet-async";

const HomePage=()=>{

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await apiService.get(`/posts?page=${currentPage}&limit=10`);
                const {posts:fetchedPosts,totalPages:fetchedTotalPages}=res.data;

                setPosts(fetchedPosts);
                setTotalPages(fetchedTotalPages);
                setError(null);
            } catch (err) {
                setError("Failed to fetch posts.Please try again later");
                console.log("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage]);

    const handlePreviousPage=()=>{
        if(currentPage>1){
            setCurrentPage(prevPage=>prevPage-1);
        }
    };
    const handleNextPage=()=>{
        if(currentPage<totalPages){
            setCurrentPage(prevPage=>prevPage+1);
        }
    };


    if (loading) return <div>Loading posts...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    return (
        <div className="home-page">
            <Helmet>
                <title>SyntaxStories - Latest Posts</title>
                <meta 
                    name="description"
                    content="Read the latest posts."
                />
            </Helmet>
            <h1>Latest Posts</h1>
            <div className="post-list">
                { posts && posts.length>0?(
                    posts.map(post=><PostListItem key={post._id} post={post} />)
                ):(
                    <p>No posts to display.</p>
                )}
            </div>
            {totalPages>0 && (
                <div className="pagination-controls">
                    <div className="page-info">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="pagination-buttons">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage===1}
                            className="btn">Previous</button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage===totalPages}
                            className="btn">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;