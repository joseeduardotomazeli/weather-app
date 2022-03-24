import DataProvider from './contexts/DataProvider';

import Routes from './routes';

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
