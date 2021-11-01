import React from 'react';
// GraphQL
import { useMutation } from '@apollo/client';
import { CustomClient } from '../../GraphQL/Clients';
import { ADD_USER } from '../../GraphQL/Mutations';
// Formik
import { Formik, Field, Form } from 'formik';
import SignupSchema from './ValidationSchema';
// Chakra-UI
import {
  Center, Box, Text, Input, Button,
  FormControl, FormLabel, FormErrorMessage,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

const AddPersonForm = () => {

  const [addUser, { error, data }] = useMutation(ADD_USER, {
    client: CustomClient
  });

  React.useEffect(() => {
    // If success submiting
    if(data && !error){
      Swal.fire({
        icon: 'success',
        title: 'You successfully sign up!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    // If error
    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [error, data]);

  return (
    <Center minH="100vh" flexDirection="column" bg="green.400">
      <Box p={12} borderWidth="1px" borderRadius={12} boxShadow="lg" bg="white" opacity="0.9">
        <Text fontSize="4xl" mb={6}>Sign Up</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false);
              addUser({
                variables: {
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword
                }
              })
              
             actions.resetForm();
            }, 1000)
          }} > 
          {(props) => (
            <Box as={Form} w={[250, 400]}>
              {/* Input Name */}
              <Field name="username">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="username" variant="flushed" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Input Email */}
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email" mt={6}>Email</FormLabel>
                    <Input {...field} id="email" placeholder="example@test.com" variant="flushed" type="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Input Password */}
              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password" mt={6}>Password</FormLabel>
                    <Input {...field} id="password" placeholder="Enter password" variant="flushed" type="password" data-testid="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Input Confirm Password */}
              <Field name="confirmPassword">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                    <FormLabel htmlFor="confirmPassword" mt={6}>Confirm password</FormLabel>
                    <Input {...field} id="confirmPassword" placeholder="Confirm password" variant="flushed" type="password" data-testid="confirmPassword" />
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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
