import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const navigate=useNavigate();

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const handleSubmit=async(event)=>{
    event.preventDefault();
    setError("");
    setLoading(true);

    try{
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
        username,
        password,
      });

      localStorage.setItem("token",response.data.token);
      navigate("/admin/dashboard");

    }catch(err){
      console.log("Login failed:",err);
      setError("Login failed.");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="login-page">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" 
            id="username" 
            name="username"
            placeholder="Enter your username" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" 
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" className="login-button" disabled={loading}>{loading ? "Logging In..." :"LogIn"}</button>
      </form>
    </div>
  );
};

export default LoginPage;

