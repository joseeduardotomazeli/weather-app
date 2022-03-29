import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface WrapperProps {
  children: ReactNode;
}

function Wrapper(props: WrapperProps) {
  const { children } = props;

  return (
    <Flex
      flexDirection="column"
      padding={4}
      minHeight="100vh"
      bgGradient="linear(to-r, purple.600, purple.900)"
    >
      {children}
    </Flex>
  );
}

export default Wrapper;
