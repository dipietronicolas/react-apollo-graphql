import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../GraphQL/Queries';
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const GetUsers = () => {

  const { loading, data } = useQuery(GET_CHARACTERS);

  return (
    <Box>
      <Button as={Link} to="/favorites" variant="link" p={6} mx="auto" my={6}>
        Favorites
      </Button>
      <Flex
        minH="100vh"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap">
        {
          loading
            ? <Spinner />
            : data.characters.results.map((character) => {
              return <CharacterCard key={character.id} {...character} />
            })
        }
      </Flex>
    </Box>
  )
}

export default GetUsers;
