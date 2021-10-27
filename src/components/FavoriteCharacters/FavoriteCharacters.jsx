import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS_BY_ID } from '../../GraphQL/Queries';
import { Box, Flex, Center, Text, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FavoriteCharacters = () => {

  const favorites = useSelector(state => state.favorites.favCharacters);
  /*
    const { loading, data } = useQuery(GET_CHARACTERS_BY_ID, {
      variables: {
        ids: favorites.map(fav => fav.id)
      }
    });
  */
  const [loadCharacters, { loading, data }] = useLazyQuery(
    GET_CHARACTERS_BY_ID, {
    variables: {
      ids: favorites.map(fav => fav.id)
    }
  });

  React.useEffect(() => {
    loadCharacters();
  }, [])

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
          (data && data.charactersByIds[0].id !== null)
            ? data.charactersByIds.map((character) => {
              return <CharacterCard key={character.id} {...character} isFav={true} />
            })
            : loading && <Spinner />
        }
        {
          (favorites.length === 0 && loading === false) &&
          <Center>
            <Text fontSize="6xl">
              There are no favorite characters
            </Text>
          </Center>
        }
      </Flex>
    </Box>
  )
}

export default FavoriteCharacters
