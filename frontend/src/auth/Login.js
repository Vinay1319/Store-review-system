import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    if (data.token) {
      dispatch(loginSuccess(data));
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "user") navigate("/normal/home");
      else navigate("/store_owner/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        <p className="switch-auth">
          Don't have an account? 
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
