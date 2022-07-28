import { gql } from '@apollo/client';
import axios from 'axios';

export const QUERY_ME = gql`
  query GetSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
      _id
      username
      email
      password
      savedBooks {
        _id
        description
        bookId
        title
      }
    }
  }
`;

export const searchGoogleBooks = (query) => {
  return axios(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
}