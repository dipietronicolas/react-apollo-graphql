import './App.css';
import { ApolloProvider } from '@apollo/client';
// Redux
import store from './store/store';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { RickAndMortyClient } from './GraphQL/Clients';


function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={RickAndMortyClient}>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
