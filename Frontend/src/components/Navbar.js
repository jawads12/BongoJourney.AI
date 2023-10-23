import { useState, useCallback } from "react";
import Mytrip from "./Mytrip";
import PortalPopup from "./PortalPopup";
import "./Navbar.css";

const Navbar = () => {
  const [isMytripOpen, setMytripOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openMytrip = useCallback(() => {
    setMytripOpen(true);
  }, []);

  const closeMytrip = useCallback(() => {
    setMytripOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="nav-buttons">
          <button className="navbar-button">Trips</button>
          <button className="navbar-button">Community</button>
          <button className="navbar-button">My Plans</button>
        </div>
        <div className="nav-image" onClick={openSidebar}>
          <img src="/navbar_pic.png" />
        </div>
      </div>

      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            
    
    <div className="sidebar-item">Notification</div>
    <div className="sidebar-item">Discounts</div>
    <div className="sidebar-item">Badges</div>
    <div className="sidebar-item">History</div>
    <div className="sidebar-item">Map</div>
    <div className="sidebar-item">Settings</div>
    <div className="sidebar-item">Signout</div>
  </div>
        </div>
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

export default Navbar;
