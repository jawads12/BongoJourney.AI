import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pop1.css'; // Import the CSS file

const Pop1 = ({ closePop1 }) => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('AI');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Retrieve the phone number from local storage when the component mounts
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedOption === 'Myself') {
      if (!phone) {
        alert('Phone number not found in local storage');
        return;
      }
  
      // Create a new Date object to get the current system date
      const currentDate = new Date();
  
      // Extract the date in "YYYY-MM-DD" format
      const formattedDate = currentDate.toISOString().split('T')[0];
  
      // Prepare the plan data to be sent to the server
      const planData = {
        phone,
        PlanSrc: selectedOption,
        startDate: formattedDate,
        // Fill in the other fields (upcoming, past, numberOfDays, withFriends, withFamily) as needed
      
      };
  
      try {
        // Send the plan data to the server to create a new plan in the database
        const response = await axios.post('http://localhost:3001/create-plan', planData);
  
        if (response.status === 200) {
          // Plan created successfully, you can add more logic if needed
          console.log('Plan created successfully');
        } else {
          console.error('Failed to create a plan');
        }
      } catch (error) {
        console.error('Error creating a plan:', error);
      }
      navigate("/dashboard/myself-design");
      closePop1();
    } else {
      // Navigate to AI Page
      navigate("/dashboard/AI-design");
    }



    
    
  };

  return (
    <div className="pop-up-container">
      <div className="pop-up-title">I want to start with...</div>
      <div className="select-container">
        <select className="select-box" value={selectedOption} onChange={handleSelectChange}>
          <option value="AI">AI</option>
          <option value="Myself">Myself</option>
        </select>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Pop1;
