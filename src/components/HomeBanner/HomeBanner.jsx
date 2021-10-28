import React from 'react';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Banner from '../../images/banner-original.jpg';
import SearchBar from '../SearchBar/SearchBar';

const HomeBanner = () => {
  return (
    <Box h="18rem" width="auto" mb={12}>
      <Image src={Banner} alt="rick and morty banner" w="100%" h="15rem" fit="cover" />
      <Flex justify="space-around" align="center" h="3rem">
        <Box>
          <SearchBar />
        </Box>
        <Box>
          <Button colorScheme="teal" as={Link} to="/favorites" mx={3} variant="outline">
            Favorites
          </Button>
          <Button colorScheme="teal" as={Link} to='/signin' mx={3}>Sign Up</Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default HomeBanner
