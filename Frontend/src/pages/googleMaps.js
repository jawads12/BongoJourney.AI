// googleMaps.js

const loadGoogleMapsScript = (callback) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDUjGb_Qcsw5zphMctknUGVN5hz7BQF_ZY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  };
  
  export default loadGoogleMapsScript;
  