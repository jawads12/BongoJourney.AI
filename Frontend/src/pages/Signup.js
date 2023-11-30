import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from 'axios'
const Signup = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    window.open("https://github.com/jawads12");
  }, []);

  const onSignUpWithClick = useCallback(() => {
    window.open("https://accounts.google.com/ServiceLogin?hl=en-GB");
  }, []);

  const onAlreadyHaveAnClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const onRectangle2Click = useCallback(() => {
    navigate("/signin");
  }, [navigate]);


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register',{name, phone, password})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  }
  
  return (
    <div className="signup">
      <img
        className="simon-berger-twukn12en7c-unspl-icon"
        alt=""
        src="/simonbergertwukn12en7cunsplash-1@2x.png"
      />
      <form onSubmit={handleSubmit}>
      <div className="signup-inner">
        <div className="bxshide-parent">
          <img className="bxshide-icon" alt="" src="/bxshide.svg" />
          <b className="create-account">Create Account</b>
          <div className="rectangle-parent" onClick={onGroupContainerClick}>
            <div className="group-child" />
            <div className="group-item" />
            
          </div>
          <div className="group-inner" />
          <div className="line-div" />
          <div className="group-child1" />
          <div className="full-name">
          <input
                type="text"
                placeholder="Name"
                name ="name"
                onChange={(e)=>setName(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid transparent", // Optional: Add a transparent bottom border if needed
                  outline: "none", // Optional: Remove the default outline when focused
                  color: "yourTextColorHere", // Set the text color
                  fontSize : "20px"
                }}
              />

          </div>
          <div
            className="already-have-an-container"
            onClick={onAlreadyHaveAnClick}
          >
            <span>Already have an account?</span>
            <span className="span">{` `}</span>
            <span className="log-in">Log in</span>
          </div>
          <div className="email-address">
          <input
                type="text"
                placeholder="Phone"
                name="email"
                onChange={(e)=>setPhone(e.target.value)}

                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid transparent", // Optional: Add a transparent bottom border if needed
                  outline: "none", // Optional: Remove the default outline when focused
                  color: "yourTextColorHere", // Set the text color
                  fontSize : "20px"
                }}
              />

          
          
          </div>
          <div className="password">
          <input
                type="password"
                placeholder="Password"
                name ="password"
                onChange={(e)=>setPassword(e.target.value)}

                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid transparent", // Optional: Add a transparent bottom border if needed
                  outline: "none", // Optional: Remove the default outline when focused
                  color: "yourTextColorHere", // Set the text color
                  fontSize : "20px"
                }}
              />

          </div>
          
          <button type="submit" className="rectangle-iv">
          <b className="create-account1">Create Account</b></button>
          
        </div>
      </div>
      </form>
      <div className="frame-parent">
        <div className="vector-parent">
          <img className="vector-icon" alt="" src="/vector.svg" />
          <img className="vector-icon1" alt="" src="/vector1.svg" />
          <img className="vector-icon2" alt="" src="/vector2.svg" />
          <img
            className="carbonlogo-discord-icon"
            alt=""
            src="/carbonlogodiscord.svg"
          />
          <div className="bongojourneyai">BongoJourney.AI</div>
          <div className="lorem-ipsum-dolor">
          Discover Bangladesh with Us.                
           Your Journey, Our Expertise!
          </div>
        </div>
        <div className="frame-child" />
      </div>
    </div>
  );
};

export default Signup;
