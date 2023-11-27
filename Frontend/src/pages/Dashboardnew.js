import React, { useState, useCallback, useRef, useEffect } from "react";
import loadGoogleMapsScript from "./googleMaps.js";
import Frame from "./user_profile.js";
import PortalPopup from "../components/PortalPopup.js";
import { Outlet, useNavigate } from "react-router-dom";
import Mytrip from "../components/Mytrip.js";
import Navbar from "../components/Navbar.js";


const Dashboard = () => {
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
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;
