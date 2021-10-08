import React from 'react';
import { Center, Text } from '@chakra-ui/layout';

function CantEnterPage() {
  return (
    <Center bg='brand.bg' color='brand.text' h='100vh'>
      <Text fontSize={40}>404! PAGE NOT FOUND :(</Text>
    </Center>
  );
}

export default CantEnterPage;
