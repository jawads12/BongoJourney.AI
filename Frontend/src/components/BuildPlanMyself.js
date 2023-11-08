import React, { useState, useRef, useEffect } from 'react';
import loadGoogleMapsScript from '../pages/googleMaps';

import './BuildPlanMyself.css';

const BuildPlanMyself = () => {
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
    loadGoogleMapsScript(() => {
      if (window.google) {
        const autocompleteFrom = new window.google.maps.places.Autocomplete(autocompleteInputFromRef.current, {
          types: ['(regions)'],
          componentRestrictions: { country: 'BD' },
        });
  
        const autocompleteTo = new window.google.maps.places.Autocomplete(autocompleteInputToRef.current, {
          types: ['(regions)'],
          componentRestrictions: { country: 'BD' },
        });

        const autocompleteAddPlace = new window.google.maps.places.Autocomplete(autocompleteInputAddPlaceRef.current, {
          componentRestrictions: { country: 'BD' },
        });
  
        autocompleteAddPlace.addListener('place_changed', function () {
          const place = autocompleteAddPlace.getPlace();
          // You can set the new place in a new state variable or perform other actions as needed
          // For example:
          // if (place.geometry) {
          //   console.log(place.geometry.location);
          // }
        });


       
  
        autocompleteFrom.addListener('place_changed', function () {
          const placeFrom = autocompleteFrom.getPlace();
          if (placeFrom && placeFrom.address_components) {
            const districtComponent = placeFrom.address_components.find(
              component => component.types.includes('administrative_area_level_2')
            );
  
            if (districtComponent) {
              setPlacesTextFrom(districtComponent.long_name);
            } else {
              setPlacesTextFrom('');
            }
          }
        });
  
        autocompleteTo.addListener('place_changed', function () {
          const placeTo = autocompleteTo.getPlace();
          if (placeTo && placeTo.address_components) {
            const districtComponent = placeTo.address_components.find(
              component => component.types.includes('administrative_area_level_2')
            );
  
            if (districtComponent) {
              setPlacesTextTo(districtComponent.long_name);
            } else {
              setPlacesTextTo('');
            }
          }
        });
      }
    });
  }, []);


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
    setNumberOfDays(event.target.value);
  };

  const handleTravelingWithChange = (event) => {
    setTravelingWith(event.target.value);
  };
  const handleAddPlaceNode = () => {
    if (placeToAdd.trim() !== '') {
      setNodes(prevNodes => [
        ...prevNodes,
        { name: placeToAdd.trim() }
      ]);
      setPlaceToAdd('');
    }
  };

  // Generate an array of numbers from 1 to the value of numberOfDays
  const dayOptions = Array.from({ length: parseInt(numberOfDays) }, (_, index) => index + 1);

  const renderDayPlans = () => {
    let plans = [];
    for (let i = 0; i < numberOfDays; i++) {
      plans.push(
        <div key={i} className="day-plan">
          <div className="day-label">Day {i + 1}</div>
          <div className="node-container">
            {nodes
              .filter(node => node.day === i)
              .map((node, index) => (
                <div key={index} className="node">
                  <div className="node-circle"></div>
                  <div className="node-name">{node.name}</div>
                </div>
              ))}
          </div>
          <div className='button-part'>
            <input
              className="add-place"
              type="text"
              placeholder="Type here to add place"
              value={placeToAdd}
              onChange={e => setPlaceToAdd(e.target.value)}
              ref={autocompleteInputAddPlaceRef}
            />
            <button className="button-node" onClick={() => handleAddPlaceNode(i)}>
              Add
            </button>
          </div>
        </div>
      );
    }
    return plans;
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
          value={date}
          onChange={handleDateChange}
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
          type="number"
          placeholder="Number of Days"
          value={numberOfDays}
          onChange={handleNumberOfDaysChange}
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
      
      {renderDayPlans()}
    </div>
  );
};

export default BuildPlanMyself;
