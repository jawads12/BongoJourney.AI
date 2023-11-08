import React, { useState, useEffect } from 'react';
import './Profile.css'; // Ensure you have the CSS file for styling
const ProfileUpdatePage = () => {
  // State for form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Effect hook to load the current user's phone number from local storage
  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const formData = new FormData();
    formData.append('phone', phoneNumber);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('http://localhost:3001/update-profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile updated successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };


  return (
    <div className="profile-update-page">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-picture">Profile Picture:</label>
          <input
            type="file"
            id="profile-picture"
            onChange={handleProfilePictureChange}
          />
        </div>
        {profilePicture && (
          <img
            src={URL.createObjectURL(profilePicture)}
            alt="Profile Preview"
            className="profile-picture-preview"
          />
        )}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
