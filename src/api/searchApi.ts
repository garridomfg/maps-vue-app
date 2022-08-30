import axios from "axios";

("/Rom.json?proximity=12.568810991231572%2C42.291896875460054&types=place%2Cpostcode%2Caddress&language=en&access_token=YOUR_MAPBOX_ACCESS_TOKEN");

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "en",
    access_token: process.env.VUE_APP_MAPS_API_KEY,
  },
});

export default searchApi;
