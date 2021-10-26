import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_BY_ID } from '../../GraphQL/Queries';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FavoriteCharacters = () => {

  const favorites = useSelector(state => state.favCharacters);

  const { loading, data } = useQuery(GET_CHARACTERS_BY_ID, {
    variables: {
      ids: favorites.map(fav => fav.id)
    }
  });

  return (
    <Box>
      <Button as={Link} to="/" colorScheme="teal" p={6} mx="auto" my={6}>
        Home
      </Button>
      <Flex
        minH="80vh"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap">
        {
          loading
            ? <Spinner />
            : data.charactersByIds.map((character) => {
              return <CharacterCard key={character.id} {...character} isFav={true} />
            })
        }
      </Flex>
    </Box>
  )
}

export default FavoriteCharacters
