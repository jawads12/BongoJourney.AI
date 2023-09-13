import { useCallback } from "react";
import "./Landingpage.css";
const Landingpage = () => {
  const onJoinTextClick = useCallback(() => {
    // Please sync "signup" to the project
  }, []);

  const onSignInTextClick = useCallback(() => {
    // Please sync "signin" to the project
  }, []);

  return (
    <div className="landingpage">
      <div className="bangladeshs-first-ai-powered-parent">
        <div className="bangladeshs-first-ai">
          Bangladesh’s First AI powered tour guide
        </div>
        <div className="bongojourneyai">BongoJourney.AI</div>
        <div className="home-parent">
          <div className="home">Home</div>
          <div className="about-us">About us</div>
          <div className="help-center">Help Center</div>
          <div className="join" onClick={onJoinTextClick}>
            Join
          </div>
          <div className="sign-in-parent">
            <div className="sign-in" onClick={onSignInTextClick}>
              Sign In
            </div>
            <img className="refer-1-icon" alt="" src="/undefined.png" />
          </div>
        </div>
        <img className="frame-child" alt="" src="/undefined1.png" />
      </div>
    </div>
  );
};

export default Landingpage;
