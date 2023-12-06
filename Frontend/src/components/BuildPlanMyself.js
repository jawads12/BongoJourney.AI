import React, { useState, useRef, useEffect } from "react";
import loadGoogleMapsScript from "../pages/googleMaps";

import "./BuildPlanMyself.css";
import DayCard from "./DayCard"; // Import the DayCard component

const BuildPlanMyself = () => {
  const [citySuggestions, setCitySuggestions] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [placesTextFrom, setPlacesTextFrom] = useState("");
  const [placesTextTo, setPlacesTextTo] = useState("");
  const [date, setDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [travelingWith, setTravelingWith] = useState("couple"); // Default value
  const [selectedDay, setSelectedDay] = useState(1);
  const [placeToAdd, setPlaceToAdd] = useState("");
  const [nodes, setNodes] = useState([]); // State to keep track of nodes

  const autocompleteInputFromRef = useRef(null);
  const autocompleteInputToRef = useRef(null);
  const autocompleteInputAddPlaceRef = useRef(null);

  const handleSavePlan = async () => {
    try {
      // Retrieve user phone number from local storage
      const storedPhone = localStorage.getItem('phone');

      // Create the plan object
      const planData = {
        from: placesTextFrom,
        to: placesTextTo,
        startDate: startDate,
        endDate: endDate,
        days: nodes,
        userPhoneNumber: storedPhone, // Include the user's phone number
      };

      // Make a POST request to save the plan
      const response = await axios.post('http://localhost:3001/save-plan', planData);

      // Handle the response, e.g., show a success message
      console.log("Plan saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };



  const fetchCitySuggestions = async () => {
    try {
      // Replace 'http://localhost:3001/cities' with your backend endpoint
      const response = await axios.get('http://localhost:3001/get-cities');
      setCitySuggestions(response.data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  // Function to filter city suggestions based on user input
  const filterCitySuggestions = (input) => {
    return citySuggestions.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    fetchCitySuggestions(); // Fetch city suggestions when the component mounts
  }, []);


  useEffect(() => {

    


    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handlePlaceToAddChange = (event) => {
    setPlaceToAdd(event.target.value);
  };

  const handlePlacesTextChangeFrom = (event) => {
    setPlacesTextFrom(event.target.value);
  };

  const handlePlacesTextChangeTo = (event) => {
    setPlacesTextTo(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleNumberOfDaysChange = (event) => {
    console.log(+event.target.value);
    setNumberOfDays(+event.target.value);
  };

  const handleTravelingWithChange = (event) => {
    setTravelingWith(event.target.value);
  };
  const handleAddPlaceNode = (e) => {
    // e.preventDefault();
    // if (e.target.value.trim() !== "") {
    //   setNodes((prevNodes) => [...prevNodes, { name: e.target.value.trim() }]);
    //   setPlaceToAdd("");
    // }
  };

  

  

  return (
    <div className="build-plan-myself">
      <div className="upper-div">
        <input
               className="from"
               type="text"
               placeholder="From"
               value={placesTextFrom}
               onChange={handlePlacesTextChangeFrom}
               ref={autocompleteInputFromRef}
        />
        <input
          className="date"
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <div className="with">with</div>
        <select
          className="family"
          value={travelingWith}
          onChange={handleTravelingWithChange}
        >
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="solo">Solo trip</option>
        </select>
        <input
          className="number-of-days"
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <input
             className="to"
             type="text"
             placeholder="To"
             value={placesTextTo}
             onChange={handlePlacesTextChangeTo}
             ref={autocompleteInputToRef}
        />
      </div>

      <div className="day-card-container">
        {Array.from({ length: numberOfDays }, (_, i) => (
          <DayCard
            key={i}
            day={i + 1}
            nodes={nodes}
            onAddPlaceNode={handleAddPlaceNode}
            // onclick={openModal}
          />
        ))}
      </div>

      <button className="save-button" onClick={handleSavePlan}>
        Save
      </button>
    </div>
  );
};

export default BuildPlanMyself;
