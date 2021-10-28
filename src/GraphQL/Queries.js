import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query CHARACTERS($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`

export const GET_CHARACTER_BY_ID = gql`
  query CHARACTER($id: ID!){
    character(id: $id) {
      id
      name
      status
      image
      species
      origin {
        id
        name
        dimension
      }
      episode {
        id
        name
      }
    }
  }
`

export const GET_CHARACTERS_BY_ID = gql`
  query CHARACTERS($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
    }
  }
`

export const QUERY_EXAMPLE = gql`
  query {
    personCount
  }
`


