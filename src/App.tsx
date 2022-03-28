import { ChakraProvider } from '@chakra-ui/react';

import DataProvider from './contexts/DataProvider';

import Routes from './routes';

function App() {
  return (
    <ChakraProvider>
      <DataProvider>
        <Routes />
      </DataProvider>
    </ChakraProvider>
  );
}

export default App;
