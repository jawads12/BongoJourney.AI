import PropTypes from 'prop-types'; // Import PropTypes
import React, { useState } from 'react';


function PopupForm({ onClose, onSubmit }) {
  const [cityData, setCityData] = useState({
    latitude: '',
    longitude: '',
    area: '',
    population: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setCityData({ ...cityData, [name]: files[0] });
    } else {
      setCityData({ ...cityData, [name]: value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!cityData.latitude || !cityData.longitude || !cityData.area || !cityData.population || !cityData.image) {
      alert('Please fill in all fields and select an image.');
      return;
    }

    onSubmit(cityData);
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', position: 'absolute', backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit}>
        <input type="number" name="latitude" placeholder="Latitude" value={cityData.latitude} onChange={handleChange} /><br />
        <input type="number" name="longitude" placeholder="Longitude" value={cityData.longitude} onChange={handleChange} /><br />
        <input type="number" name="area" placeholder="Area" value={cityData.area} onChange={handleChange} /><br />
        <input type="number" name="population" placeholder="Population" value={cityData.population} onChange={handleChange} /><br />
        <input type="file" id="cityImage" name="image" onChange={handleChange} />

        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}


PopupForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  
export default PopupForm;