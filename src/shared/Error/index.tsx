import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle marginRight={2}>Erro!</AlertTitle>
      <AlertDescription>Permissão de localização negada.</AlertDescription>
    </Alert>
  );
}

export default Error;
