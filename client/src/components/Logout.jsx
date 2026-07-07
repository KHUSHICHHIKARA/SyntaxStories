import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Logout=()=>{
    const navigate=useNavigate();
    const handleSubmit=()=>{
        localStorage.removeItem("token");
        navigate("/admin/login", { replace: true });
    }
    const token=localStorage.getItem("token");
    const check=!token;
    return(
        <button type="button" onClick={handleSubmit} disabled={check}>Logout</button>
    )
}
export default Logout;