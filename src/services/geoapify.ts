import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.geoapify.com/v1',
  params: {
    apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
  },
});

export default api;
