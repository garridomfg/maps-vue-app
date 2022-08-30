import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "en",
    access_token: process.env.VUE_APP_MAPS_API_KEY,
  },
});

export default searchApi;
