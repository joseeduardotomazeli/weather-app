import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appId: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    lang: 'pt_br',
    units: 'metric',
  },
});

export default api;
