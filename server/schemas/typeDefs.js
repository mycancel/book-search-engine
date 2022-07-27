const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String!
    # saved book id from GoogleBooks
    bookId: String!
    image: String
    link: String
    title: String!
  }

  # TODO: Add virtual from User.js
  # TODO: Add validation to email
  # TODO: Are there unique properties in GraphQL?
  type User {
    username: String!
    email: String!
    password: String!
    # set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [Book]
  }
`;

module.exports = typeDefs;
