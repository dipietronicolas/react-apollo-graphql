import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation($username: String!, $email: String!, $password: String!, $confirmPassword: String!){
    addUser(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
      username
      email
      password
      confirmPassword
    }
  }
`