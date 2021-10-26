import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Text, Center } from '@chakra-ui/react';
import GetUsers from '../components/GetUsers/GetUsers';
import CharacterDatail from '../components/CharacterDetail/CharacterDetail';
import FavoriteCharacters from '../components/FavoriteCharacters/FavoriteCharacters';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <GetUsers />
        </Route>
        <Route path="/user/:id">
          <CharacterDatail />
        </Route>
        <Route path="/favorites">
          <FavoriteCharacters />
        </Route>
        <Route>
          <Center minH="80vh">
            <Text fontSize="6xl" mx="auto">404</Text>
          </Center>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
