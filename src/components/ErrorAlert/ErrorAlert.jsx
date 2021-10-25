import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

const ErrorAlert = ({ message }) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px">
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        GraphQL error
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {message}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert
