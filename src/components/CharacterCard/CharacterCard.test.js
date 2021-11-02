import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import CharacterCard from './CharacterCard';
import CharacterPicture from '../../images/CharacterCard-ImageTest.jpeg';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { ApolloProvider } from '@apollo/client';
import { RickAndMortyClient } from '../../GraphQL/Clients';
import { BrowserRouter } from 'react-router-dom';

const props = {
  id: "1",
  name: "Rick Sanchez",
  image: CharacterPicture
}

describe('CharacterCard test', () => {

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <ApolloProvider client={RickAndMortyClient}>
          <BrowserRouter>
            <CharacterCard {...props} />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  })

  test('renders content', () => {
    screen.getByText(/rick sanchez/i);
    screen.getByAltText(/rick sanchez picture/i);
  })

  test('favorite button change color', () => {
    const activeColor = '#319795', disabledColor = '#E2E8F0';
    const favoriteButton = screen.getByTestId('starIcon');

    console.log(prettyDOM(favoriteButton));
    //expect(favoriteButton).toHaveStyle('color', disabledColor);
  })
})