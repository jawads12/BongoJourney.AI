import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AIPage.css'; // Ensure this CSS file exists and is styled as per your requirements

const AIPage = () => {
  const navigate = useNavigate();

  // States for form fields
  const [destination, setDestination] = useState('Chittagong'); // Default to 'Chittagong'
  const [gender, setGender] = useState('Male');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [season, setSeason] = useState('Summer');
  const [budget, setBudget] = useState('');
  const [withPerson, setWithPerson] = useState('Family');
  const [children, setChildren] = useState('No');
  const [numPlaces, setNumPlaces] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    if (!destination || !gender || !fromDate || !toDate || !season || !budget || !withPerson || !children || !numPlaces) {
      alert('Please fill out all fields.');
      return; // Stop the function if validation fails
    }
    e.preventDefault();
    setIsLoading(true); // Start loading


    const planData = {
      destination,
      budget: parseInt(budget),
      days: fromDate && toDate ? (new Date(toDate) - new Date(fromDate)) / (24 * 3600 * 1000) : 0, 
      gender,
      child: children,
      withs: withPerson,
      season,
      num_places: parseInt(numPlaces)
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', planData);
      if (response.status === 200) {
        setIsLoading(false); // Stop loading

        navigate('/dashboard/display-places', { state: { places: response.data.top_predicted_places } });
      } else {
        console.error('Failed to fetch data from Flask');
        setIsLoading(false); // Stop loading on error

      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      setIsLoading(false); // Stop loading on error

    }
  };

  if (isLoading) {
    return <div className="loading-container">Predicting...</div>; // Customize this as per your UI design
  }

  return (
    <div className="ai-page-container">
      <h2 className="ai-title">AI Trip Advisor</h2>
      <form className="ai-form" onSubmit={handleSubmit}>
      <select value={destination} onChange={e => setDestination(e.target.value)}>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Khulna">Khulna</option>
        </select>        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" placeholder="From Date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <input type="date" placeholder="To Date" value={toDate} onChange={e => setToDate(e.target.value)} />
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Autumn">Autumn</option>
        </select>
        <input type="number" placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
        <select value={withPerson} onChange={e => setWithPerson(e.target.value)}>
          <option value="Family">Family</option>
          <option value="Solo">Solo</option>
          <option value="Friends">Friends</option>
          <option value="Couple">Couple</option>
        </select>
        <select value={children} onChange={e => setChildren(e.target.value)}>
          <option value="Yes">Yes, I will travel with Children</option>
          <option value="No">No, I won't travel with Children</option>
        </select>
        <div className="left-align-text">Number of Places to Predict</div>
        <input type="number" placeholder="Number of Places" value={numPlaces} onChange={e => setNumPlaces(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AIPage;
