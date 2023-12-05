import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';

// Assuming the announcement object has these properties
// title, details, announcingTime, announcingDate

export default function PostCard({ ann, onDelete  }) {
  const { title, details, announcingTime, announcingDate } = ann;

  const handleDelete = () => {
    onDelete(ann._id);
  };
  const renderTitle = (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 'bold',
        mb: 1,
        color : 'red'
      }}
    >
      {title}
    </Typography>
  );

  const renderDetails = (
    <Typography variant="body2" color="text.secondary">
      {details}
    </Typography>
  );

  const renderDateTime = (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        color: 'text.secondary',
      }}
    >
      {`Announced on ${announcingDate} at ${announcingTime}`}
    </Typography>
  );

  return (
    <Grid xs={12} sm={6} md={4}>
      <Card>
        <Box sx={{ p: 3 }}>
          {renderTitle}
          {renderDetails}
          {renderDateTime}
          <Button onClick={handleDelete}>Delete</Button>

        </Box>

      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  ann: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,

};
