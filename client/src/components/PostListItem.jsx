import { Link } from "react-router-dom";

const PostListItem=({post})=>{
    const snippet=post.markdownContent
    .replace(/[#*`]/g," ").substring(0,150)+".....";

    return(
        <Link to={`/post/${post._id}`} className="post-link">
        <article className="post-lit-item">
            <h2>{post.title}</h2>
            <div className="post-meta">
                <span>by {post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString}</span>
                <p>{snippet}</p>
            </div>
        </article>
        </Link>
    )
}
export default PostListItem;