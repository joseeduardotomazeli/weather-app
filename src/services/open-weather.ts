import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  },
});

export default api;
