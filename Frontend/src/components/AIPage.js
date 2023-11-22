import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AIPage.css'; // Ensure this CSS file exists and is styled as per your requirements

const AIPage = () => {
  const navigate = useNavigate();

  // States for form fields
  const [destination, setDestination] = useState('');
  const [gender, setGender] = useState('Male');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [season, setSeason] = useState('Summer');
  const [budget, setBudget] = useState('');
  const [withPerson, setWithPerson] = useState('Family');
  const [children, setChildren] = useState('No');
  const [numPlaces, setNumPlaces] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        navigate('/dashboard/display-places', { state: { places: response.data.top_predicted_places } });
      } else {
        console.error('Failed to fetch data from Flask');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  return (
    <div className="ai-page-container">
      <h2 className="ai-title">AI Trip Advisor</h2>
      <form className="ai-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" placeholder="From Date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <input type="date" placeholder="To Date" value={toDate} onChange={e => setToDate(e.target.value)} />
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Autumn">Autumn</option>
          <option value="Monsoon">Monsoon</option>
        </select>
        <input type="number" placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
        <select value={withPerson} onChange={e => setWithPerson(e.target.value)}>
          <option value="Family">Family</option>
          <option value="Solo">Solo</option>
          <option value="Friends">Friends</option>
          <option value="Couple">Couple</option>
        </select>
        <select value={children} onChange={e => setChildren(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input type="number" placeholder="Number of Places" value={numPlaces} onChange={e => setNumPlaces(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AIPage;
