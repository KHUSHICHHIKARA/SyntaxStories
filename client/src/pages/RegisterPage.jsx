import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

const RegisterPage=()=>{
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    });
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{    
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData);
            localStorage.setItem("token",res.data.token);
            navigate("/admin/dashboard");
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }   
    return (
        <div className="login-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <input type="text" 
                        name="username" 
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                    />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>{loading ? "Registering..":"Register"}</button>
            </form>
            {error && <p style={{textAlign:"center",color:"red"}}>{error}</p>}
            <p className="auth-redirect">Already have an account? <Link to="admin/login">SignIn</Link></p>
        </div>
    )
}

export default RegisterPage;