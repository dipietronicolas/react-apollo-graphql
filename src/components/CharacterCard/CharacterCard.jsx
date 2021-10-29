import React from 'react';
import { Box, Flex, Text, Image, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon, DeleteIcon } from '@chakra-ui/icons';

const CharacterCard = ({ id, name, image, isFav = false }) => {

  const [isFavorite, setIsFavorite] = React.useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favCharacters)

  const handleDeleteButton = () => {
    dispatch({ type: 'REMOVE_CHARACTER_BY_ID', payload: id })
  }

  const handleFavoriteButton = () => {
    setIsFavorite(!isFavorite);
    dispatch({ type: isFavorite ? 'REMOVE_FAV_CHAR' : 'ADD_FAV_CHAR', payload: id })
  }

  React.useEffect(() => {
    isFav && setIsFavorite(true);
  }, [isFav])

  React.useEffect(() => {
    setIsFavorite(
      favorites
        .map(favorite => favorite.id)
        .find(favId => favId === id)
          ? true
          : false
    )
  }, [favorites, id])

  return (
    <Box borderWidth="1px" borderRadius="lg" p={3} mt={3} minW="xs">
      <Link to={`/user/${id}`}>
        <Image src={image} alt={`${name} picture`} />
      </Link>
      <Flex justify="space-between" mt={3}>
        <Text fontSize="xl">{name}</Text>
        <Box>
          {
            !isFav && (
              <IconButton
                aria-label="delete from store"
                colorScheme="red"
                onClick={handleDeleteButton}
                icon={<DeleteIcon />} />
            )
          }
          <IconButton
            aria-label="add to favorite"
            variant="outline"
            onClick={handleFavoriteButton}
            color={isFavorite ? "teal" : "gray.200"}
            icon={<StarIcon />} />
        </Box>
      </Flex>
    </Box>
  )
}

export default CharacterCard
