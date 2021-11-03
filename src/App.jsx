import { useEffect } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import Router from './router/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { RickAndMortyClient } from './GraphQL/Clients';
import { useDispatch } from 'react-redux';
// testing comment
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('favs')) {
      dispatch({
        type: 'LOAD_ON_INIT',
        payload: JSON.parse(localStorage.getItem('favs'))
      })
    }
  }, [dispatch])

  return (
    <ApolloProvider client={RickAndMortyClient}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
