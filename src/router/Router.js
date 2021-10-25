import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
          404
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
