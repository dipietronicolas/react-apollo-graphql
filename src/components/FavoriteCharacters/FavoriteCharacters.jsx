import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_BY_ID } from '../../GraphQL/Queries';
import { Box, Flex, Center, Text, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Framer-motion
import { motion } from "framer-motion"

const FavoriteCharacters = () => {

  const favorites = useSelector(state => state.favorites.favCharacters);

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
          (data && data.charactersByIds[0].id !== null)
            ? data.charactersByIds.map((character) => {
              return (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                  }}
                  transition={{ delay: 0.5 }}>
                  <CharacterCard key={character.id} {...character} isFav={true} />
                </motion.div>
              )
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
