import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import { AddressType } from '../types/Address';
import { WeatherType } from '../types/Weather';

import openWeatherApi from '../services/open-weather';
import geoapifyApi from '../services/geoapify';

interface DataContextData {
  isLoading: boolean;
  hasError: boolean;
  weather: WeatherType | undefined;
  address: AddressType | undefined;
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

  const [weather, setWeather] = useState<WeatherType>();
  const [address, setAddress] = useState<AddressType>();

  const { children } = props;

  const getAddressWeatherByUserPosition = useCallback(() => {
    async function onSuccess(position: GeolocationPosition) {
      const { latitude: lat, longitude: lon } = position.coords;

      const [responseWeather, responseAddress] = await Promise.allSettled([
        openWeatherApi.get('/data/2.5/weather', {
          params: { lat, lon },
        }),

        geoapifyApi.get('/geocode/reverse', {
          params: { lat, lon },
        }),
      ]);

      setIsLoading(false);

      const weather =
        responseWeather.status === 'fulfilled' && responseWeather.value.data;

      const address =
        responseAddress.status === 'fulfilled' &&
        responseAddress.value.data['features'][0]['properties'];

      if (weather)
        setWeather({
          temperature: weather.main.temp,
          icon: weather.weather[0].icon,
          description: weather.weather[0].description,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed,
        });

      if (address)
        setAddress({
          street: address.street,
          houseNumber: address.housenumber,
          city: address.city,
        });
    }

    function onError() {
      setIsLoading(false);
      setHasError(true);

      console.log('Error on get navigator current position.');
    }

    setIsLoading(true);
    setHasError(false);

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
        weather,
        address,
        getAddressWeatherByUserPosition,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
