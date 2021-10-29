import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../GraphQL/Queries';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import {
  Input, FormControl, InputGroup, InputRightElement, FormErrorMessage, Button
} from '@chakra-ui/react';


const SearchBar = () => {

  const [searchWord, setSearchWord] = React.useState('');
  const dispatch = useDispatch();

  const [search, { data }] = useLazyQuery(GET_CHARACTERS, {
    variables: {
      filter: {
        name: searchWord
      }
    }
  });

  React.useEffect(() => {
    (searchWord.length > 0) && search();
  }, [searchWord, search])

  React.useEffect(() => {
    data && dispatch({ type: 'ADD_CHARACTERS', payload: data.characters.results });
  }, [data, dispatch])

  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values, actions) => {
        setSearchWord(values.search)
        actions.setSubmitting(false)
      }} >
      {(props) => (
        <Form>
          <Field name="search">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.search && form.touched.search}>
                <InputGroup size="md" >
                  <Input {...field} id="search" placeholder="Search" w={{ base: "18rem", md: "20rem"}} />
                  <FormErrorMessage>{form.errors.search}</FormErrorMessage>
                  <InputRightElement width="4.5rem" >
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      mr={3}
                      isLoading={props.isSubmitting}
                      type="submit">
                      Search!
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBar
