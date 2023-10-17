import React, { useEffect, useState } from "react";

const PlaceDetailsModal = ({ place, onClose }) => {
  // Ensure that place data is available
  if (!place) {
    return null;
  }

  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    // Function to fetch place details using the place_id
    const fetchPlaceDetails = async () => {
      // Replace 'YOUR_GOOGLE_API_KEY' with your actual Google API key
      const apiKey = 'AIzaSyDUjGb_Qcsw5zphMctknUGVN5hz7BQF_ZY';

      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setPlaceDetails(data.result);
        } else {
          console.error('Error fetching place details');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [place]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{placeDetails?.name}</h2>
        <p>{placeDetails?.formatted_address}</p>
        <ul>
          {placeDetails?.photos && placeDetails.photos.map((photo, index) => (
            <li key={index}>
              <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=YOUR_GOOGLE_API_KEY`} alt={`Photo ${index}`} />
            </li>
          ))}
        </ul>
        <h3>User Reviews:</h3>
        <ul>
          {placeDetails?.reviews && placeDetails.reviews.map((review, index) => (
            <li key={index}>
              <p>Rating: {review.rating}</p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
        /* Add more information if needed */
      </div>
    </div>
  );
};

export default PlaceDetailsModal;
