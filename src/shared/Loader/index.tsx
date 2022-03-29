import { Spinner } from '@chakra-ui/react';

function Loader() {
  return (
    <Spinner
      size="xl"
      color="purple.500"
      emptyColor="gray.200"
      thickness="4px"
      speed="0.65s"
    />
  );
}

export default Loader;
