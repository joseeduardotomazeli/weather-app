import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import { AddressType } from '../types/Address';
import { WeatherType } from '../types/Weather';

import geoapifyApi from '../services/geoapify';
import openWeatherApi from '../services/open-weather';

interface DataContextData {
  isLoading: boolean;
  hasError: boolean;
  address: AddressType | undefined;
  weather: WeatherType | undefined;
  getAddressWeatherByUserPosition: () => void;
}

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextData>(
  {} as DataContextData
);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function DataProvider(props: DataProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [address, setAddress] = useState<AddressType>();
  const [weather, setWeather] = useState<WeatherType>();

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

      setIsLoading(false);
      setHasError(false);

      const address =
        responseAddress.status === 'fulfilled' &&
        responseAddress.value.data['features'][0]['properties'];

      const weather =
        responseWeather.status === 'fulfilled' && responseWeather.value.data;

      if (address)
        setAddress({
          street: address.street,
          housenumber: address.housenumber,
          city: address.city,
        });

      if (weather)
        setWeather({
          temperature: weather.main.temp,
          icon: weather.weather[0].icon,
          description: weather.weather[0].description,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed,
        });
    }

    function onError() {
      setIsLoading(false);
      setHasError(true);

      console.log('Error on get navigator current position.');
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  useEffect(() => {
    getAddressWeatherByUserPosition();
  }, [getAddressWeatherByUserPosition]);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        hasError,
        address,
        weather,
        getAddressWeatherByUserPosition,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
