import React from 'react';
import { Box, Flex, Text, Image, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StarIcon } from '@chakra-ui/icons';


const CharacterCard = ({ id, name, image, isFav = false }) => {

  const [isFavorite, setIsFavorite] = React.useState(false);

  // Redux
  const dispatch = useDispatch();

  const handleFavoriteButton = () => {
    setIsFavorite(!isFavorite);
    dispatch({ type: isFavorite ? 'REMOVE_FAV_CHAR' : 'ADD_FAV_CHAR', payload: id })
  }

  React.useEffect(() => {
    isFav && setIsFavorite(true);
  }, [isFav])

  return (
    <Box borderWidth="1px" borderRadius="lg" p={3} mt={3} minW="xs">
      <Link to={`/user/${id}`}>
        <Image src={image} alt={`${name} picture`} />
      </Link>
      <Flex justify="space-between" mt={3}>
        <Text fontSize="2xl">{name}</Text>
        <IconButton
          aria-label="Search database"
          variant="outline"
          onClick={handleFavoriteButton}
          color={isFavorite ? "teal" : "gray.200"}
          icon={<StarIcon />} />
      </Flex>
    </Box>
  )
}

export default CharacterCard
