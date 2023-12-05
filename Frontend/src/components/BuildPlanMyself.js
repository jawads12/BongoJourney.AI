import React, { useState, useRef, useEffect } from 'react';
import loadGoogleMapsScript from '../pages/googleMaps';

import './BuildPlanMyself.css';
import DayCard from './DayCard'; // Import the DayCard component


const BuildPlanMyself = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [placesTextFrom, setPlacesTextFrom] = useState('');
  const [placesTextTo, setPlacesTextTo] = useState('');
  const [date, setDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [travelingWith, setTravelingWith] = useState('couple'); // Default value
  const [selectedDay, setSelectedDay] = useState(1);
  const [placeToAdd, setPlaceToAdd] = useState('');
  const [nodes, setNodes] = useState([]); // State to keep track of nodes

  const autocompleteInputFromRef = useRef(null);
  const autocompleteInputToRef = useRef(null);
  const autocompleteInputAddPlaceRef = useRef(null);


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
    console.log(+event.target.value)
    setNumberOfDays(+event.target.value);
  };

  const handleTravelingWithChange = (event) => {
    setTravelingWith(event.target.value);
  };
  const handleAddPlaceNode = (e) => {
    e.preventDefault();
    if (e.target.value.trim() !== '') {
      setNodes(prevNodes => [
        ...prevNodes,
        { name: e.target.value.trim() }
      ]);
      setPlaceToAdd('');
    }
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
      
      {
         Array.from({ length: numberOfDays }, (_, i) => (
          <DayCard 
            key={i} 
            day={i + 1} 
            nodes={nodes} 
            onAddPlaceNode={handleAddPlaceNode}
          />
        ))
      }
    </div>
  );
};

export default BuildPlanMyself;
