const BASE_URL_HERE = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`;
const BASE_URL_MAPBOX = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
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
  async getMatrixDistances(userCoordinates = [], taskCoordinates = []) {
    let user = userCoordinates.join(',') + ';';
    let tasks = taskCoordinates.map(task => Object.values(task)).flat().reverse()   //.join(',') + ';';
    const length = tasks.length;
    for (let i = 0; i < length; i++) {
      if (i + 1 === length) {
        tasks[i] += '?'
      } else if (i % 2 !== 0 && i + 1 !== length) {
        tasks[i] += ';'
      } else {
        tasks[i] += ',';
      }
    }
    tasks = tasks.join('');

    let mapbox_url = `${BASE_URL_MAPBOX}${user}${tasks}access_token=${token}`;

    const distances = await fetch(mapbox_url)
      .then(response => response.json())
      .then(data => {
        // check for good status
        // If no waypoints are defined, return null
        if (!data.routes) return null;
        console.log(data)

      })
      .catch(error => {
        return null;
      });
    return distances;
  }
}

/*
  
  let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLongitude}%2C${userLatitude}%3B`

  coordinates.forEach(function(element) {
    url += `${element.longitude}%2C${element.latitude}%3B`
  })
  url += `.json?${token}`
}
*/

export default apiServices;