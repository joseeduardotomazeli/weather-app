import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

import useData from '../../hooks/useData';

function Header() {
  const [isSmallDevice] = useMediaQuery('(max-width: 30em');

  const { isLoading, getAddressWeatherByUserPosition } = useData();

  const date = new Date();

  const dateFormatted = date.toLocaleDateString('pt-br', {
    weekday: isSmallDevice ? 'short' : 'long',
    day: 'numeric',
    month: 'numeric',
  });

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      marginBottom={4}
      width="100%"
      height="fit-content"
    >
      <Flex>
        <Box marginRight={2}>
          <Heading as="h1" color="gray.200" fontSize="medium">
            Builders | Weather app
          </Heading>
        </Box>

        <Tooltip label="Recarregar">
          <IconButton
            aria-label="Recarregar"
            size="xs"
            colorScheme="blue"
            icon={<RepeatIcon />}
            disabled={isLoading}
            onClick={getAddressWeatherByUserPosition}
          />
        </Tooltip>
      </Flex>

      <Text color="gray.200" fontSize="medium">
        {dateFormatted}
      </Text>
    </Flex>
  );
}

export default Header;