import React, { useState } from 'react';

import { Modal, Box, TextField, Button, Stack, Typography, Container, Grid } from '@mui/material';

import { posts } from 'src/_mock/blog';

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
  const [openModal, setOpenModal] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: '',
    details: ''
  });

  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Implement API call to save data
    console.log(announcement);
    handleCloseModal();
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
          </form>
        </Box>
      </Modal>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
