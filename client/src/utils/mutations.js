import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($id: ID!, $description: String!, $bookId: String!, $title: String!, $authors: [String], $image: String, $link: String) {
    saveBook(id: $id, description: $description, bookId: $bookId, title: $title, authors: $authors, image: $image, link: $link) {
      _id
      username
      savedBooks {
        _id
        description
        bookId
        title
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!, $bookId: String!) {
    deleteBook(id: $id, bookId: $bookId) {
      _id
      username
      savedBooks {
        _id
        description
        title
        bookId
      }
    }
  }
`;