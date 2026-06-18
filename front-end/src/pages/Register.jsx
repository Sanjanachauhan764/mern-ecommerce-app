import axios from "axios";
import { useState } from "react";

function Register(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function registerUser(){

        const res = await axios.post(
            "https://mern-ecommerce-app-qzaz.onrender.com/register",
            {
                name,
                email,
                password
            }
        );

        alert(res.data.message);

        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="auth-container">

            <h1>Register</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={registerUser}>
                Register
            </button>

        </div>
    );
}

export default Register;