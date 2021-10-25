import React from 'react';
import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Flex h="100%" w="100%" alignItems="center" justifyContent="center" p={3}>
      <ChakraSpinner
        h="7rem" 
        w="7rem"
        thickness="12px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl" />
    </Flex>
  )
}

export default Spinner
