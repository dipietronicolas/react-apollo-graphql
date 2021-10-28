import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import Paginator from '../Paginator/Paginator';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../GraphQL/Queries';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import HomeBanner from '../HomeBanner/HomeBanner';

const GetUsers = () => {

  const [currentPage, setCurrentPage] = React.useState(1);
  
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
    <Box>
      <HomeBanner />
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
      <Paginator handlePageChange={handlePageChange} />
    </Box>
  )
}

export default GetUsers;
