import React, { useState } from 'react';

import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

import PopupForm from './cityPopup'; // Adjust the path according to your project structure

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

function CartWidget() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (cityData) => {
    // Call API to save data
    console.log(cityData);
    // Close popup after submit
    setIsPopupOpen(false); // Close popup after form submission
  };

  return (
    <div>
      <Iconify icon="gridicons:plus" width={50} height={50} onClick={handleIconClick} />
      {setIsPopupOpen && <PopupForm onClose={togglePopup} onSubmit={handleSubmit} />}
    </div>
  );




  
}




export default CartWidget;
