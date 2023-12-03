import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function CityCard({ city }) {
  const renderImg = (
    <Box
      component="img"
      alt={city.name}
      src={city.picture} // Assuming 'picture' is the field for the city image URL
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  // Additional city details can be added here
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {city.name}
        </Typography>

        <Typography variant="body2">
          Latitude: {city.latitude}
        </Typography>
        <Typography variant="body2">
          Longitude: {city.longitude}
        </Typography>
        <Typography variant="body2">
          Area: {city.area} km²
        </Typography>
        <Typography variant="body2">
          Population: {city.population}
        </Typography>
      </Stack>
    </Card>
  );
}

CityCard.propTypes = {
  city: PropTypes.object.isRequired,
};
