import React, { useState ,useEffect } from 'react';

import {  Modal,Box,  Button,Container ,Typography , TextField,  CircularProgress} from '@mui/material';
import Iconify from 'src/components/iconify';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { rootShouldForwardProp } from '@mui/material/styles/styled';
import axios from "axios"

import ProductCard from '../product-card';

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ProductsView() {
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [cityData, setCityData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    area: '',
    population: '',
    picture: null
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    
  };

  const handleInputChange = (event) => {
    setCityData({ ...cityData, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    setCityData({ ...cityData, picture: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Start loading


    const image = await convertBase64(cityData.picture);
    console.log(typeof image);

    const formData = new FormData();
    formData.append('name', cityData.name);
    formData.append('latitude', cityData.latitude);
    formData.append('longitude', cityData.longitude);
    formData.append('area', cityData.area);
    formData.append('population', cityData.population);
    formData.append('picture', image); // Add the picture file

    try {
      const response = await axios.post("http://localhost:3001/add-city", formData);

      if (response.status === 201) {
        console.log("City added successfully");
        setCities([...cities, response.data]); // Update list with new city

      } else {
        console.log("Error adding city");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); // Stop loading
      handleCloseModal();

    }
  };



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
  }, []);


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Cities
      </Typography>
      <Button   onClick={handleOpenModal} // Add this line
 variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add City
        </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New City
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="City Name"
              name="name"
              value={cityData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Latitude"
              name="latitude"
              value={cityData.latitude}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Longitude"
              name="longitude"
              value={cityData.longitude}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Area"
              name="area"
              value={cityData.area}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Population"
              name="population"
              value={cityData.population}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="picture"
              onChange={handleFileChange}
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
              <Button type="button" color="secondary" variant="outlined" onClick={handleCloseModal} sx={{ ml: 2 }}>
                Cancel
              </Button>
              {isSubmitting && <CircularProgress size={24} sx={{ ml: 2 }} />}

            </Box>
          </form>
        </Box>
      </Modal>

     
      <Grid container spacing={3}>
        {cities.map((city) => (
          <Grid key={city.id} xs={12} sm={6} md={3}>
            <ProductCard city={city} />
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