import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
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