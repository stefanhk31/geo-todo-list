const BASE_URL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`;

const apiServices = {
  // Using FETCH api to GET geocode of user's address entered
  async getCoordinates(address) {
    const url = `${BASE_URL}&searchtext=${address}`;

    const coordinates = await fetch(url)
      .then(response => response.json())
      .then(data => {
        // check for good status
        // If view is empty, no locations so return null
        if (data.Response.View.length === 0) return null;

        // Access first relevant location, if non-existent return null
        const coordinates = data.Response
          .View[0]
          .Result[0]
          .Location
          .DisplayPosition;

        return {
          latitude: coordinates.Latitude,
          longitude: coordinates.Longitude,
        };
      })
      .catch(error => {
        return null;
      });

    return coordinates;
  },
};

export default apiServices;