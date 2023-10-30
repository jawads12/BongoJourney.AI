import React, { useState, useRef, useEffect } from 'react';
import loadGoogleMapsScript from '../pages/googleMaps';

import './BuildPlanMyself.css';

const BuildPlanMyself = () => {
  const [placesText, setPlacesText] = useState('');
  const [placesTextTo, setPlacesTextTo] = useState('');
  const autocompleteInputRef = useRef(null);
  const autocompleteInputToRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
          componentRestrictions: { country: 'BD' },
        });

        const autocompleteTo = new window.google.maps.places.Autocomplete(autocompleteInputToRef.current, {
          componentRestrictions: { country: 'BD' },
        });

        autocomplete.addListener('place_changed', function () {
          const place = autocomplete.getPlace();
          console.log(place);
        });

        autocompleteTo.addListener('place_changed', function () {
          const placeTo = autocompleteTo.getPlace();
          console.log(placeTo);
        });
      }
    });
  }, []);

  const handlePlacesTextChange = (event) => {
    setPlacesText(event.target.value);
  };

  const handlePlacesTextChangeTo = (event) => {
    setPlacesTextTo(event.target.value);
  };

  return (
    <div className="build-plan-myself">
      <div className="upper-div">
        <input
          className="from"
          type="text"
          placeholder="From"
          value={placesText}
          onChange={handlePlacesTextChange}
          ref={autocompleteInputRef}
        />
        <input className="date" type="date" />
        <div className="with">with</div>
        <select className="family">
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="friend">Solo trip</option>
        </select>
        <input className="number-of-days" type="number" placeholder="Number of Days" />
        <input
          className="to"
          type="text"
          placeholder="To"
          value={placesTextTo}
          onChange={handlePlacesTextChangeTo}
          ref={autocompleteInputToRef}
        />
      </div>
      <div className="lower-div">
        <label className="daywise-plan">Daywise Plan</label>
        <input className="day" placeholder="Day" type="text" />
        <select className="label">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div className="node">
          <div className="node-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default BuildPlanMyself;
