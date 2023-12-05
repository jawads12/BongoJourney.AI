import React, { useState, useEffect } from 'react';

import { Modal, Box, TextField, Button, Stack, Typography, Container, Grid, CircularProgress  } from '@mui/material';

import { posts } from 'src/_mock/blog';
import axios from 'axios';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

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
export default function AnnouncementView() {
  const [loading, setLoading] = useState(false);

  const [announcements, setAnnouncements] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line

  const [announcement, setAnnouncement] = useState({
    title: '',
    details: ''
  });

  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when submission starts
    const announcingTime = new Date().toLocaleTimeString();
    const announcingDate = new Date().toLocaleDateString();

    try {
      const response = await axios.post('http://localhost:3001/add-announcement', {
        ...announcement,
        announcingTime,
        announcingDate
      });
      if (response.data.success) {
        console.log('Announcement added successfully');
        // Handle success (e.g., update UI, close modal)

      } else {
        console.log('Error adding announcement');
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
      window.location.reload();

    }
  };


  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/get-announcements');
        console.log("Fetched announcements:", response.data); // Debugging
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnnouncements();
  }, []);
  




  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-announcement/${id}`);
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };









  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Announcement</Typography>

        <Button   onClick={handleOpenModal} // Add this line
 variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Announcement
        </Button>
        <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Announcement
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Announcement Title"
              name="title"
              onChange={handleChange}
              value={announcement.title}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Announcement Details"
              name="details"
              onChange={handleChange}
              value={announcement.details}
              multiline
              rows={4}
            />
            <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
            {isSubmitting && <CircularProgress size={24} sx={{ ml: 2 }} />}

          </form>
        </Box>
      </Modal>
      </Stack>

      <Grid container spacing={3}>
  {loading ? (
    <CircularProgress />
  ) : (
    announcements.map((announcement, index) => (
      <PostCard key={index} ann={announcement} onDelete={handleDeleteAnnouncement} />
    ))
  )}
</Grid>
    </Container>
  );
}
