import { useState, useCallback } from "react";
import Mytrip from "./Mytrip";
import PortalPopup from "./PortalPopup";
import "./Navbar.css";

const Navbar = () => {
    const [isMytripOpen, setMytripOpen] = useState(false);

    const openMytrip = useCallback(() => {
        setMytripOpen(true);
    }, []);

    const closeMytrip = useCallback(() => {
        setMytripOpen(false);
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="nav-buttons">
                    <button className="navbar-button" >Trips</button>
                    <button className="navbar-button" >Community</button>
                    <button className="navbar-button" >My Plans</button>
                </div>
                <div className="nav-image">
                    <img src="/navbar_pic.png" />
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
        </>
    );
};

export default Navbar;
