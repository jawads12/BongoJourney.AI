import { useState, useCallback } from "react";
 import Frame from "./user_profile";
import PortalPopup from "../components/PortalPopup";
import Mytrip from "../components/Mytrip";
import "./Dashboard.css";

const Dashboard = () => {
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isMytripOpen, setMytripOpen] = useState(false);

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  const openMytrip = useCallback(() => {
    setMytripOpen(true);
  }, []);

  const closeMytrip = useCallback(() => {
    setMytripOpen(false);
  }, []);

  const onDashStartATripClick = useCallback(() => {
    // Please sync "dashboard" to the project
  }, []);

  return (
    <>
      <div className="dashboard">
        <img
          className="dash-sabbir-rahaman-paxuttf3bv-icon"
          alt=""
          src="/dash-sabbirrahamanpaxuttf3bvqunsplash-1@2x.png"
        />
        <div className="dash-frame3">
          <div className="dash-group-36630">
            <div className="dash-group-36630-child" />
          </div>
          <img
            className="dash-glass-1-icon"
            alt=""
            src="/dash-glass-1@2x.png"
          />
          <div className="dash-text">PLaces to go, things to do</div>
        </div>
        <div className="dash-rectangle-13" />
        <div className="dash-search">Search</div>
        <div className="dash-frame2">
          <div
            className="pxl-20230420-0511079402-1-wrapper"
            onClick={openFrame}
          >
            <img
              className="pxl-20230420-0511079402-1-icon"
              alt=""
              src="/pxl-20230420-0511079402-1@2x.png"
            />
          </div>
          <div className="discover">Discover</div>
          <div className="trips" onClick={openMytrip}>
            Trips
          </div>
          <div className="community">Community</div>
          <div className="my-plan">My Plan</div>
        </div>
        <div className="dash-frame1">
          <div className="dash-in-minuites">in minutes</div>
          <div className="dash-build-a-trip">Build a trip</div>
          <div className="dash-get-a-personalized">
            Get a personalized itinerary just for you,
          </div>
          <div className="dash-guided-by-traveler">
            guided by traveler tips and reviews.
          </div>
          <div className="dash-rectangle-14" />
          <div className="dash-start-a-trip" onClick={onDashStartATripClick}>
            Start a trip with AI
          </div>
        </div>
      </div>
      {isFrameOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeFrame}
        >
          <Frame onClose={closeFrame} />
        </PortalPopup>
      )}
      {isMytripOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMytrip}
        >
          <Mytrip onClose={closeMytrip} />
        </PortalPopup>
      )}
    </>
  );
};

export default Dashboard;
