import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useMediaQuery,
} from '@chakra-ui/react';

function Error() {
  const [isSmallDevice] = useMediaQuery('(max-width: 30em');

  return (
    <Alert status="error" borderRadius="3xl">
      <AlertIcon />
      {!isSmallDevice && <AlertTitle marginRight={2}>Erro!</AlertTitle>}

      <AlertDescription>Permissão de localização negada.</AlertDescription>
    </Alert>
  );
}

export default Error;
