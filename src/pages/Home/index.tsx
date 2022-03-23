import { useState, useEffect, useCallback } from 'react';

import geoapifyApi from '../../services/geoapify';
import openWeatherApi from '../../services/open-weather';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function Home() {
  const [address, setAddress] = useState(null);
  const [weather, setWeather] = useState(null);

  const getAddressAndWeather = useCallback(() => {
    async function onSuccess(position: GeolocationPosition) {
      const { latitude: lat, longitude: lon } = position.coords;

      const [responseAddress, responseWeather] = await Promise.allSettled([
        geoapifyApi.get('/geocode/reverse', {
          params: { lat, lon },
        }),

        openWeatherApi.get('/data/2.5/weather', {
          params: { lat, lon },
        }),
      ]);

      setAddress(
        responseAddress.status === 'fulfilled' && responseAddress.value.data
      );

      setWeather(
        responseWeather.status === 'fulfilled' && responseWeather.value.data
      );
    }

    function onError() {
      console.log('Error on get navigator current position.');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  useEffect(() => {
    getAddressAndWeather();
  }, [getAddressAndWeather]);

  return <h1>Builders | Weather App</h1>;
}

export default Home;
