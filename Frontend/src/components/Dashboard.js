import React, { useState, useCallback, useRef, useEffect } from "react";
import loadGoogleMapsScript from "../pages/googleMaps";
import Frame from "../pages/user_profile.js";
import PortalPopup from "./PortalPopup.js";
import Modal from "react-modal";
import Pop1 from "./Pop1.js";
import { useNavigate } from "react-router-dom";
import Mytrip from "./Mytrip.js";

import "./Dashboard.css";


const Dashboard = () => {


  
  const [isPop1Open, setPop1Open] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isMytripOpen, setMytripOpen] = useState(false);
  const [placesText, setPlacesText] = useState("");
  const autocompleteInputRef = useRef(null);
  const navigate = useNavigate();


  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  const openPop1 = useCallback(() => {
    setPop1Open(true);
  }, []);

  const closePop1 = useCallback(() => {
    setPop1Open(false);
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

  const onMyPlanClick = useCallback(() => {
    navigate("/my-plan");
  }, [navigate]);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (window.google) {
        // Initialize the Places Autocomplete service with componentRestrictions
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
          componentRestrictions: { country: "BD" }, // "BD" represents Bangladesh
        });

        autocomplete.addListener("place_changed", function () {
          const place = autocomplete.getPlace();
          console.log(place); // You can handle the selected place as needed
        });
      }
    });
  }, []);

  const handlePlacesTextChange = (event) => {
    setPlacesText(event.target.value);
  };

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
          <input
            type="text"
            placeholder="Places to go, things to do"
            className="dash-text"
            value={placesText}
            onChange={handlePlacesTextChange}
            ref={autocompleteInputRef}
          />
        </div>
        <div className="dash-rectangle-13" />
        <button className="dash-rectangle-13">Search</button>
        
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
          <div className="dash-start-a-trip" onClick={openPop1}>
            Start a trip
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
      {isPop1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePop1}
        >
          <Pop1 closePop1={closePop1} />
        </PortalPopup>
      )}


    </>
  );
};

export default Dashboard;
