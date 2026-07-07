import { Link } from "react-router-dom";
import CategoryTag from "./CategoryTag";

const categoriesContainerStyle = {
  marginTop:"10px",
};

const PostListItem=({post})=>{
    const snippet=post.markdownContent
    .replace(/[#*`]/g," ").substring(0,150)+".....";

    return(    
        <article className="post-list-item">
            <Link to={`/post/${post.slug}`} className="post-link">
                <h2>{post.title}</h2>
                <div className="post-meta">
                    <span>by {post.author.username}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <p className="post-snippet">{snippet}</p>
                </div>
            </Link>
            
            {post.categories && post.categories.length >0 && (
                <div style={categoriesContainerStyle}>
                    {post.categories.map(category=>(
                        <CategoryTag key={category} category={category}/>
                    ))}
                </div>
            )}
        </article>
    )
}
export default PostListItem;