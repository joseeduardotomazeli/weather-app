import { Text } from '@chakra-ui/react';

import { AddressType } from '../../types/Address';

interface AddressProps {
  address: AddressType;
}

function Address(props: AddressProps) {
  const { address } = props;

  return (
    <>
      <Text
        color="white"
        fontFamily="monospace"
        fontSize="large"
        fontWeight="bold"
        textAlign="center"
      >
        📍 {address.street} - {address.housenumber},
      </Text>

      <Text
        color="white"
        fontFamily="monospace"
        fontSize="large"
        textAlign="center"
      >
        {address.city}
      </Text>
    </>
  );
}

export default Address;
