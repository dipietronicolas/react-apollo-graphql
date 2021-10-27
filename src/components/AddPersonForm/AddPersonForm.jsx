import React from 'react';
// GraphQL
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EXAMPLE } from '../../GraphQL/Queries';
import { CustomClient } from '../../GraphQL/Clients';
import { ADD_USER } from '../../GraphQL/Queries';
// Formik
import { Formik, Field, Form } from 'formik';
// Chakra-UI
import {
  Center, Box, Text, Input, Button,
  FormControl, FormLabel, FormErrorMessage,
} from '@chakra-ui/react'

const AddPersonForm = () => {
  /*
    const { loading, data } = useQuery(QUERY_EXAMPLE, {
      client: CustomClient
    });
  */
  const [addUser, { data }] = useMutation(ADD_USER, {
    client: CustomClient
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Center minH="80vh" flexDirection="column">
      <Box p={12} borderWidth="1px" borderRadius={12} boxShadow="lg" bg="gray.100" opacity="0.9">
        <Text fontSize="4xl" mb={6}>Sign Up</Text>
        <Formik
          initialValues={{
            name: "",
            email: ""
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false)
              addUser({
                variables: {
                  name: values.name,
                  email: values.email
                }
              })
            }, 1000)
          }}
        >
          {(props) => (
            <Box as={Form} w={[250, 400]}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <Input {...field} id="name" placeholder="name" variant="flushed" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email" mt={6}>Email</FormLabel>
                    <Input {...field} id="email" placeholder="example@test.com" variant="flushed" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit">
                Submit
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Center>
  )
}

export default AddPersonForm;
