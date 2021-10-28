import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Input, FormControl, InputGroup, InputRightElement, FormErrorMessage, Button
} from '@chakra-ui/react';


const SearchBar = () => {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }} >
      {(props) => (
        <Form>
          <Field name="search">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.search && form.touched.search}>
                <InputGroup size="md" >
                  <Input {...field} id="search" placeholder="Search" w="20rem" />
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
