import './App.css';
// Apollo & GraphQL
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';
// Redux
import store from './store/store';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { ChakraProvider } from '@chakra-ui/react';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
