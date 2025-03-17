import React, { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import './styles/SignUp.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = await signupUser(name, email, password, address);
    console.log(data);
    if (data?.user?.id) navigate("/");
    else alert("Signup Failed");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
        <button type="submit">Sign Up</button>
        <p className="switch-auth">
          Already have an account? 
          <button onClick={() => navigate("/")}>Login</button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
