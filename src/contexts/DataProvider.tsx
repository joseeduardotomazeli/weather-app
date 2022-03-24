import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import geoapifyApi from '../services/geoapify';
import openWeatherApi from '../services/open-weather';

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({});

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function DataProvider(props: DataProviderProps) {
  const [address, setAddress] = useState(null);
  const [weather, setWeather] = useState(null);

  const { children } = props;

  const getAddressWeatherByUserPosition = useCallback(() => {
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
    getAddressWeatherByUserPosition();
  }, [getAddressWeatherByUserPosition]);

  return (
    <DataContext.Provider
      value={{ address, weather, getAddressWeatherByUserPosition }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
