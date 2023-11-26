import React, { useState, useCallback } from "react";
import Mytrip from "./Mytrip";
import PortalPopup from "./PortalPopup";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMytripOpen, setMytripOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const openMytrip = useCallback(() => {
        setMytripOpen(true);
    }, []);

    const closeMytrip = useCallback(() => {
        setMytripOpen(false);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="navbar">
                <div className="nav-buttons">
                    <button onClick={() => navigate("/dashboard/ashol-dashboard")} className="navbar-button">Trips</button>
                    <button className="navbar-button">Community</button>
                    <button className="navbar-button">My Plans</button>
                </div>
                <div className="nav-image" onClick={toggleSidebar}>
                    <img src="/navbar_pic.png" alt="Navbar Image" />
                </div>
            </div>
            {isMytripOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeMytrip}
                >
                    <Mytrip onClose={closeMytrip} />
                </PortalPopup>
            )}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-image">
                        <img src="/navbar_pic.png" alt="Sidebar Image" />
                    </div>
                    <div className="jawad">
                        <span>Jawadur Rahman</span>
                    </div>

                <div className="sidebar-content">
               
                    
                    <div className="sidebar-item" onClick={() => navigate("/dashboard/profile")}>
                        <span>Profile</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/notifications")}>
                        <span>Notifications</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/discount-badges")}>
                        <span>Discount</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/history")}>
                        <span>History</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/map")}>
                        <span>Map</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/settings")}>
                        <span>Settings</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/signin")}>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            <div className={`overlay ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}></div>
        </>
    );
};

export default Navbar;
