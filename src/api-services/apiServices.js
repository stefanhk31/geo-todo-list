const BASE_URL_HERE = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`;
const BASE_URL_MAPBOX = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/`;
const token = process.env.REACT_APP_API_KEY;

const apiServices = {
  // Using FETCH api to GET geocode of user's address entered
  async getCoordinates(address) {
    let geocode_url = `${BASE_URL_HERE}&searchtext=${address}`;

    const coordinates = await fetch(geocode_url)
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
          longitude: coordinates.Longitude
        }
      })
      .catch(error => {
        return null;
      });
    return coordinates;
  },
  //Need to associate each distance value with the task/location it corresponds to 
  async getMatrixDistances(userCoordinates = [], taskCoordinates = []) {
    let user = userCoordinates.join(',') + ';';
    let tasks = taskCoordinates.join(',') + '?'; 

    let mapbox_url = `${BASE_URL_MAPBOX}${user}${tasks}sources=0&annotations=distance&access_token=${token}`;

    const distances = await fetch(mapbox_url)
      .then(response => response.json())
      .then(data => {
        // check for good status; if no data, return null
        if (!data.distances) return null;

        const distances = data.distances[0]
          .slice(1)
          .map(d => d / 1609.344);
        return distances[0];

      })
      .catch(error => {
        return null;
      });
    return distances; 
  }
}

export default apiServices;