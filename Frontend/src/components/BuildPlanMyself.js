import React, { useState, useRef, useEffect } from "react";
import loadGoogleMapsScript from "../pages/googleMaps";
import axios from "axios"; // Import Axios


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
  const [cities, setCities] = useState([]);
  const [searchResultsFrom, setSearchResultsFrom] = useState([]);
  const [searchResultsTo, setSearchResultsTo] = useState([]);


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
    axios
      .get("http://localhost:3001/get-cities")
      .then((res) => {
        setCities(res.data.map((city) => city.name));
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);



  useEffect(() => {
    fetchCitySuggestions(); // Fetch city suggestions when the component mounts
  }, []);


  function searchCity(query) {
    query = query.toLowerCase();
    return cities.filter((city) => city.toLowerCase().includes(query));
  }



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
    const searchText = event.target.value;
    setPlacesTextFrom(searchText);

    const resultsFrom = searchCity(searchText);
    setSearchResultsFrom(resultsFrom);
  };

  const handlePlacesTextChangeTo = (event) => {
    const searchText = event.target.value;
    setPlacesTextTo(searchText);

    const resultsTo = searchCity(searchText);
    setSearchResultsTo(resultsTo);
  };
  const handleCitySelect = (selectedCity, field) => {
    // Handle the selected city for the specified field (e.g., "from" or "to")
    if (field === "from") {
      setPlacesTextFrom(selectedCity);
    } else if (field === "to") {
      setPlacesTextTo(selectedCity);
    }
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
      <select
          className="from"
          value={placesTextFrom}
          onChange={(e) => handleCitySelect(e.target.value, "from")}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

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
        <select
          className="to"
          value={placesTextTo}
          onChange={(e) => handleCitySelect(e.target.value, "to")}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

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
