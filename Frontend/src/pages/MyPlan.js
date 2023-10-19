import { useState, useCallback } from "react";
import PortalPopup from "../components/PortalPopup";
import Mytrip from "../components/Mytrip";

import "./MyPlan.css";

const MyPlan = () => {
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isMytripOpen, setMytripOpen] = useState(false);

  const openUserProfile = useCallback(() => {
    setUserProfileOpen(true);
  }, []);

  const closeUserProfile = useCallback(() => {
    setUserProfileOpen(false);
  }, []);

  const openMytrip = useCallback(() => {
    setMytripOpen(true);
  }, []);

  const closeMytrip = useCallback(() => {
    setMytripOpen(false);
  }, []);

  return (
    <>
      <div className="my-plan1">
        <div className="plan-your-trip">Plan Your Trip</div>
        <div className="where-to">Where To?</div>
        <input className="chittagong" placeholder="Chittagong" type="text" />
        <input className="dhaka" placeholder="Dhaka" type="text" />
        <div className="starts-from">Starts From?</div>
        <div className="days2">
          <div className="day-1">
            <b className="day-11">Day 1</b>
            <div className="ellipse-parent">
              <div className="group-child" />
              <div className="group-item" />
              <div className="group-inner" />
              <div className="ellipse-div" />
              <div className="group-child1" />
              <img className="arrow-icon" alt="" src="/arrow-4.svg" />
              <img className="group-child2" alt="" src="/arrow-4.svg" />
              <img className="group-child3" alt="" src="/arrow-6.svg" />
              <img className="group-child4" alt="" src="/arrow-7.svg" />
              <div className="pousheee-restaurant">Pousheee Restaurant</div>
              <div className="mermaid-beach-resort">Mermaid Beach Resort</div>
              <div className="marine-drive">Marine Drive</div>
              <div className="sonadia-island">Sonadia Island</div>
              <div className="stone-forest">Stone Forest</div>
              <div className="hour">1 hour</div>
              <div className="minuite">30 minuite</div>
              <div className="minuite1">45 minuite</div>
              <div className="minuite2">50 minuite</div>
              <div className="group-child" />
              <div className="group-item" />
              <div className="group-inner" />
              <div className="ellipse-div" />
              <div className="group-child1" />
              <img className="arrow-icon" alt="" src="/arrow-4.svg" />
              <img className="group-child2" alt="" src="/arrow-4.svg" />
              <img className="group-child3" alt="" src="/arrow-6.svg" />
              <img className="group-child4" alt="" src="/arrow-7.svg" />
              <div className="pousheee-restaurant">Pousheee Restaurant</div>
              <div className="mermaid-beach-resort">Mermaid Beach Resort</div>
              <div className="marine-drive">Marine Drive</div>
              <div className="sonadia-island">Sonadia Island</div>
              <div className="stone-forest">Stone Forest</div>
              <div className="hour">1 hour</div>
              <div className="minuite">30 minuite</div>
              <div className="minuite1">45 minuite</div>
              <div className="minuite2">50 minuite</div>
            </div>
            <div className="amjad-rana-mrkpi-yajc0-unsplas-wrapper">
              <img
                className="amjad-rana-mrkpi-yajc0-unsplas-icon1"
                alt=""
                src="/amjadranamrkpiyajc0unsplash-2@2x.png"
              />
            </div>
          </div>
          <div className="day-container">
            <b className="day-2">Day 2</b>
            <div className="ellipse-group">
              <div className="group-child14" />
              <div className="group-child15" />
              <div className="group-child16" />
              <img className="group-child17" alt="" src="/arrow-4.svg" />
              <img className="group-child18" alt="" src="/arrow-4.svg" />
              <div className="patenga-sea-beach">Patenga Sea Beach</div>
              <div className="naval-beach">Naval Beach</div>
              <div className="vatiary-lake">Vatiary Lake</div>
              <div className="hour2">1 hour</div>
              <div className="minuite6">30 minuite</div>
              <div className="group-child14" />
              <div className="group-child15" />
              <div className="group-child16" />
              <img className="group-child22" alt="" src="/arrow-4.svg" />
              <img className="group-child18" alt="" src="/arrow-4.svg" />
              <div className="hour2">1 hour</div>
              <div className="minuite6">30 minuite</div>
            </div>
            <div className="mt-aditya-das-o2e8q09kzsi-unsp-wrapper">
              <img
                className="mt-aditya-das-o2e8q09kzsi-unsp-icon1"
                alt=""
                src="/mt-adityadaso2e8q09kzsiunsplash-2@2x.png"
              />
            </div>
          </div>
        </div>
        <img
          className="destination-1-icon"
          alt=""
          src="/destination-1@2x.png"
        />
        <div className="dash-frame21">
          <div
            className="pxl-20230420-0511079402-1-container"
            onClick={openUserProfile}
          >
            <img
              className="pxl-20230420-0511079402-1-icon1"
              alt=""
              src="/uf-img@2x.png"
            />
          </div>
          <div className="discover1">Discover</div>
          <div className="trips1" onClick={openMytrip}>
            Trips
          </div>
          <div className="community1">Community</div>
          <div className="my-plan2">My Plan</div>
        </div>
        <div className="rectangle-parent">
          <div className="rectangle-div" />
          <button className="add-day">Add Day</button>
        </div>
      </div>
      {isUserProfileOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUserProfile}
        >
          <Frame onClose={closeUserProfile} />
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

export default MyPlan;
