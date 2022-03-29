import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';

import { WeatherType } from '../../types/Weather';

interface WeatherProps {
  weather: WeatherType;
}

function Weather(props: WeatherProps) {
  const { weather } = props;

  const imageSource = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <Flex flexDirection="column" align="center">
      <Image src={imageSource} alt="Ícone do clima" />

      <Flex>
        <Text color="white" fontSize="9xl" fontWeight="bold" lineHeight={1}>
          {Math.round(weather.temperature)}
        </Text>

        <Text color="white" fontSize="6xl" fontWeight="bold">
          °
        </Text>
      </Flex>

      <Flex
        justifyContent="space-between"
        marginTop={16}
        paddingX={6}
        paddingY={4}
        width="100%"
        borderRadius="3xl"
        backgroundColor="purple.900"
      >
        <Text color="white">{weather.description}</Text>

        <Tooltip label="Humidade">
          <Text color="white">{weather.humidity}% 💦</Text>
        </Tooltip>

        <Tooltip label="Velocidade do vento">
          <Text color="white">{weather.windSpeed}m/s 🍃</Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Weather;
