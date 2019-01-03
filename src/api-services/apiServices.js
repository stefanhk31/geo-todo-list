const BASE_URL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`;

const apiServices = {
  // Using FETCH api to GET geocode of user's address entered
  async getGeocode(address) {
    const url = `${BASE_URL}&searchtext=${address}`;

    const geocode = await fetch(url)
      .then(response => {
        // check for good status
        if (response.status !== 200) return null;

        return response.json();
      })
      .catch(error => null);

    return geocode;
  },
};

export default apiServices;