const axios = require('axios');

exports.getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
      encodeURIComponent(address) + 
      '.json?access_token=' + process.env.MAPBOX_TOKEN);
    
    const [lng, lat] = response.data.features[0].center;
    return { lat, lng };
  } catch (err) {
    throw new Error('Could not get coordinates for the given address');
  }
};