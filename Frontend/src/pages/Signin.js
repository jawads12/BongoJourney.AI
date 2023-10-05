import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from 'axios'; // Import axios for API calls

const Signin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for the "Remember me" checkbox

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onButtonSignInClick = useCallback(async () => {
    try {
      // Make an API call to the login endpoint
      const response = await axios.post('http://localhost:3001/login', {
        phone,
        password
      });
      console.log(phone)

      // Check the API response for authentication success
      if (response.data.authenticated) {
        navigate("/dashboard"); // Navigate to the dashboard on success
      } else {
        alert("Wrong password"); // Show an alert for wrong password
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
              <div className="or">Or</div>
              <div className="button-sign-in1" onClick={onButtonSignIn1Click}>
                <img className="icon" alt="" src="/undefined26.png" />
                <div className="sign-in">Sign in with Google</div>
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
