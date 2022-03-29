import { Container, Flex, Box, Divider } from '@chakra-ui/react';

import Wrapper from '../../shared/Wrapper';
import AppBar from '../../shared/Header';
import Loader from '../../shared/Loader';
import Error from '../../shared/Error';
import Weather from '../../shared/Weather';
import Address from '../../shared/Address';
import Footer from '../../shared/Footer';

import useData from '../../hooks/useData';

function Home() {
  const { isLoading, hasError, weather, address } = useData();

  return (
    <Wrapper>
      <AppBar />

      {hasError ? (
        <Flex flex={1} align="center" justify="center" height="100%">
          <Container>
            <Error />
          </Container>
        </Flex>
      ) : isLoading ? (
        <Flex flex={1} align="center" justify="center" height="100%">
          <Loader />
        </Flex>
      ) : (
        <Container flex={1}>
          <>
            {weather && (
              <Box marginBottom={16}>
                <Weather weather={weather} />
              </Box>
            )}

            {address && <Address address={address} />}
          </>
        </Container>
      )}

      <Divider opacity={0.2} />

      <Footer />
    </Wrapper>
  );
}

export default Home;
