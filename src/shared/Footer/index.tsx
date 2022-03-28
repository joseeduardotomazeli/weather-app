import { Center, Text, Link } from '@chakra-ui/react';

function Footer() {
  const gitHubLink = 'https://github.com/joseeduardotomazeli';

  return (
    <Center marginTop={4}>
      <Text color="white" fontSize="small">
        Feito por{' '}
        <Link href={gitHubLink} target="_blank" fontWeight="bold">
          José Eduardo Tomazeli
        </Link>{' '}
        🧑🏻‍💻
      </Text>
    </Center>
  );
}

export default Footer;
