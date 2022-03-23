import { useState, useEffect, useCallback } from 'react';

import openWeatherApi from '../../services/open-weather';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function Home() {
  const [weather, setWeather] = useState(null);

  const getWeather = useCallback(() => {
    async function onSuccess(position: GeolocationPosition) {
      const { latitude: lat, longitude: lon } = position.coords;

      const response = await openWeatherApi.get('/data/2.5/weather', {
        params: { lat, lon },
      });

      setWeather(response.data);
    }

    function onError() {
      console.log('Error on get navigator current position.');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return <h1>Builders | Weather App</h1>;
}

export default Home;
