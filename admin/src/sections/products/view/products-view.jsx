import React, { useState } from 'react';
import { Container, Typography, Button, Modal, Box, TextField } from '@mui/material';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import axios from "axios"

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
        handleCloseModal();
      } else {
        console.log("Error adding city");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Cities
      </Typography>
      <Button onClick={handleOpenModal}>Add City</Button>

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
            </Box>
          </form>
        </Box>
      </Modal>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <ProductSort />
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
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