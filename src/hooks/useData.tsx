import { useContext } from 'react';

import { DataContext } from '../contexts/DataProvider';

function useData() {
  const context = useContext(DataContext);
  return context;
}

export default useData;
