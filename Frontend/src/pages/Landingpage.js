import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";

const Landingpage = () => {
  const navigate = useNavigate();

  const onJoinTextClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const onSignInTextClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  return (
    <div className="landingpage">
      <div className="frame-parent2">
        <div className="frame3">
          <div className="bangladeshs-first-ai">
            Bangladesh’s First AI powered tour guide
          </div>
        </div>
        <div className="frame4">
          <div className="bongojourneyai1">BongoJourney.AI</div>
        </div>
        <img className="frame-child1" alt="" src="/line-1.svg" />
        <div className="frame5">
          <div className="frame6">
            <div className="help-center">Help Center</div>
            <div className="frame7">
              <div className="home">Home</div>
              <div className="join" onClick={onJoinTextClick}>
                Join
              </div>
              <div className="home">About us</div>
            </div>
            <div className="frame8">
              <img className="refer-1-icon" alt="" src="/undefined.png" />
              <div className="sign-in1" onClick={onSignInTextClick}>
                Sign In
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
