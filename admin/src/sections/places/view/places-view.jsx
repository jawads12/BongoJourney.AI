import React, { useState, useEffect } from 'react';
import Iconify from 'src/components/iconify/iconify';

import { Container, Typography, Button, Modal, Box, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';

import SpotCard from '../places-card';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PlacesView() {
  const [cities, setCities] = useState([]);

  const [spots, setSpots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  
  const [spotData, setSpotData] = useState({
    cityName: '',
    spotName: '',
    latitude: '',
    longitude: '',
    details: '',
    openingTime: '',
    closingTime: '',
    address: '',
    picture: null
  });

  useEffect(() => {

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
    const fetchSpots = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-spots');
        setSpots(response.data);
      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    };
    fetchSpots();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleInputChange = (event) => setSpotData({ ...spotData, [event.target.name]: event.target.value });
  const handleFileChange = (event) => setSpotData({ ...spotData, picture: event.target.files[0] });
  const handleCityChange = (event) => setSelectedCity(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const image = await convertBase64(spotData.picture);
    console.log(typeof image);
    const formData = new FormData();
    formData.append('cityName', selectedCity);
    formData.append('spotName', spotData.spotName);
    formData.append('latitude', spotData.latitude);
    formData.append('longitude', spotData.longitude);
    formData.append('details', spotData.details);
    formData.append('openingTime', spotData.openingTime);
    formData.append('closingTime', spotData.closingTime);
    formData.append('address', spotData.address);
    formData.append('picture', image);
    

    try {
      const response = await axios.post("http://localhost:3001/add-spot", formData);
      if (response.status === 200) {
        console.log("Spot added successfully");
        setSpots([...spots, response.data]); // Update list with new spot
      } else {
        console.log("Error adding spot");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tourist Spots
      </Typography>
      <Button   onClick={handleOpenModal} // Add this line
 variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Spot
        </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">Add a Place</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>City Name</InputLabel>
              <Select value={selectedCity} label="City Name" onChange={handleCityChange}>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth margin="normal" label="Spot Name" name="spotName" onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Spot Details" name="spotDetails" onChange={handleInputChange} />
            <TextField fullWidth margin="normal" type="time" label="Opening Time" name="openingTime" onChange={handleInputChange} />
            <TextField fullWidth margin="normal" type="time" label="Closing Time" name="closingTime" onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Address" name="address" onChange={handleInputChange} />
            <input type="file" name="spotPicture" onChange={handleFileChange} />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" color="primary" variant="contained">Submit</Button>
              <Button type="button" color="secondary" variant="outlined" onClick={handleCloseModal}>Cancel</Button>
              {isSubmitting && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Box>
          </form>
        </Box>
      </Modal>

      <Grid container spacing={3}>
      {spots.map((spot) => (
  <Grid key={spot._id} xs={12} sm={6} md={3}>
    <SpotCard spot={spot} />
  </Grid>
))}
      </Grid>
    </Container>
  );
  
}




export const convertBase64 = (file) => {
  const fileReader = new FileReader();
 
  return new Promise((resolve, reject) => {
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}