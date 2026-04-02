import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const handleSubmit=async(event)=>{
    event.preventDefalut();

    setError("");
    setLoading(true);

    try{
      const res=await axios.post("http://localhost:5000/api/auth/login",{
        username,
        password
      });

      console.log("Login sucess:",res.data);
      alert("Login successful!");
    }catch(err){
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
        <button type="submit" className="login-button" disabled={loading}>LogIn</button>
        {loading ? "Logging In..." :"Log In"}
      </form>
    </div>
  );
};

export default LoginPage;