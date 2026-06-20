import axios from "axios";
import { useState } from "react";

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    async function loginUser(){
        const res = await axios.post(
            "https://mern-ecommerce-app-qzaz.onrender.com/login",
            {
                email: loginEmail,
                password: loginPassword
            }
        );
        if(res.data.token){ 
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("role",res.data.role);
            localStorage.setItem("userEmail",loginEmail);
            alert("Login Successful");
            window.location.href = "/";
        }else{
            alert(res.data.message);
        }
    }

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/><br /><br />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/><br /><br />
            <button onClick={loginUser} >Login</button>
        </div>
    );
}

export default Login;