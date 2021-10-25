import React from 'react';
import Spinner from '../Spinner/Spinner';
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { GET_CHARACTER_BY_ID } from '../../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const CharacterDetail = () => {

  const { id } = useParams();

  const { error, loading, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: {
      id
    }
  });
  

  return (
    <Box minH="100vh">
      <Button as={Link} to="/" variant="link" p={6}>
        Home
      </Button>
      <Flex w={[300, 300, 700]} borderWidth="1px" borderRadius="lg" mx="auto" my={6} p={3} wrap="wrap">
        {loading && <Spinner />}
        {data && (
          <>
            <Image
              src={data.character.image}
              alt={`${data.character.name} picture`}
              mx="auto" />
            <Box w={["100%", "100%", "50%"]}>
              <Text fontSize="2xl" mt={3}>{data.character.name}</Text>
              <Text fontSize="lg" mt={3}>Status: {data.character.name}</Text>
              <Text fontSize="lg">Specie: {data.character.species}</Text>
              <Text fontSize="lg">Episodes: {data.character.episode.length}</Text>
              <Text fontSize="lg">{data.character.origin.dimension}</Text>
            </Box>
          </>
        )}
        {error && <ErrorAlert {...error}/>}
      </Flex>
    </Box>
  )
}

export default CharacterDetail
