import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import Paginator from '../Paginator/Paginator';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../GraphQL/Queries';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import HomeBanner from '../HomeBanner/HomeBanner';
// Framer-motion
import { motion } from "framer-motion"

const GetUsers = () => {

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageRef = React.useRef(null);

  const { loading, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: currentPage
    }
  });

  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters.characters);

  React.useEffect(() => {
    data && dispatch({ type: 'ADD_CHARACTERS', payload: data.characters.results })
  }, [data, dispatch])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <Box ref={pageRef}>
      <HomeBanner />
      <Flex
        minH="100vh"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        px={3}>
        {
          loading && characters.length > 0
            ? <Spinner />
            : characters.map((character, i) => {
              return (
                <motion.div
                  key={character.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 25, opacity: 1 }}
                  transition={{ delay: i / 8, type: "spring", stiffness: 100 }}>
                  <CharacterCard {...character} />
                </motion.div>
              )
            })
        }
      </Flex>
      <Paginator handlePageChange={handlePageChange} />
    </Box>
  )
}

export default GetUsers;
