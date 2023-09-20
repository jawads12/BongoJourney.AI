import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const onButtonSignInClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);



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
              <div className="email">Email</div>
            </div>
            <div className="enter-your-email-wrapper">
              <div className="email">Enter your email</div>
            </div>
          </div>
          <div className="password1">
            <div className="frame-container">
              <div className="email-wrapper">
                <div className="email">Password</div>
              </div>
              <div className="enter-your-password-parent">
                <div className="enter-your-password">Enter your password</div>
                <img className="bxhide-icon" alt="" src="/bxhide.svg" />
              </div>
            </div>
            <div className="frame-parent1">
              <div className="rectangle-group">
                <div className="frame-inner" />
                <div className="remember-me">Remember me</div>
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
  );
};

export default Signin;
