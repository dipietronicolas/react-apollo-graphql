import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../GraphQL/Queries';
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const GetUsers = () => {

  const { loading, data } = useQuery(GET_CHARACTERS);

  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters.characters);

  React.useEffect(() => {
    data && dispatch({ type: 'ADD_CHARACTERS', payload: data.characters.results })
  }, [data, dispatch])

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
          loading && characters.length > 0
            ? <Spinner />
            : characters.map((character) => {
              return <CharacterCard key={character.id} {...character} />
            })
        }
      </Flex>
    </Box>
  )
}

export default GetUsers;
