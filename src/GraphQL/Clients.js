// Apollo & GraphQL
import {
  ApolloClient, InMemoryCache,
  HttpLink, from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';

export const CustomClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000'
});


// Rick and Morty API 
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' })
])

export const RickAndMortyClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});