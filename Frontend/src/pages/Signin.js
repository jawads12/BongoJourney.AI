import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Function to handle sign-in
  const onButtonSignInClick = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        phone,
        password
      });
  
      if (response.data.authenticated) {
        // Save the phone number to local storage only if login is successful
      
        // Check if the user is an admin
        if (response.data.isAdmin) {
          const adminDashboardUrl = `http://localhost:3030?token=${response.data.token}`;
          window.location.href = adminDashboardUrl;
          console.log(5);
        
        } else {
          navigate("/dashboard/ashol-dashboard"); // Redirect to regular user dashboard
          const formattedPhone = phone.startsWith("88") ? phone : `88${phone}`;
        localStorage.setItem("phone", formattedPhone);
        localStorage.setItem("token", response.data.token); // Store the token in local storage
  
        }




      } else {
        alert("Wrong password");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }, [phone, password, navigate]);
  

  const onButtonSignIn1Click = useCallback(() => {
    window.open("https://accounts.google.com/ServiceLogin?hl=en-GB");
  }, []);

  return (
    <div className="signin">
      <div className="frame">
        <img className="frame-item" alt="" src="/group-36638@2x.png" />
      </div>
      <div className="frame-group">
        <div className="frame1">
          <b className="welcome-back">Welcome Back</b>
        </div>
        <div className="form">
          <div className="frame-container">
            <div className="email-wrapper">
              <div className="email">Phone</div>
              <input
                type="text"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone no"
              />
            </div>
            <div className="password1">
              <div className="frame-container">
                <div className="email-wrapper">
                  <div className="email">Password</div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  
                </div>
              </div>
              <div className="frame-parent1">
                <div className="rectangle-group">
                  <div className="frame-inner">
                    <input
                      type="checkbox"
                      className="remember-me-checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </div>
                  <label className="remember-me-text">Remember me</label>
                </div>
                <div className="forgot-password">Forgot Password</div>
              </div>
            </div>
            <div className="sign-in-an-sign-up">
              <div className="button-sign-in" onClick={onButtonSignInClick}>
                <div className="sign-in">Sign in</div>
              </div>
              
            </div>
          </div>
          <div className="frame2" />
          <img className="frame-icon" alt="" src="/frame-78.svg" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
