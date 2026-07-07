import { Link } from "react-router-dom"
import Logout from "./Logout";
const Navbar=()=>{
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-brand">SyntaxStories</Link>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/admin/login">Admin Login</Link>
                    <Link to="/admin/register">Register</Link>
                    <Logout/>
                </li>
                <li>
                    <Link to="/admin/dashboard">Admin DashBoard</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;