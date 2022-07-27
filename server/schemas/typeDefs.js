const { gql } = require("apollo-server-express");

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

  # TODO: Add virtual and method from User.js
  # TODO: Add validation to email
  # TODO: Are there unique properties in GraphQL?
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    # set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [Book]
  }

  type Query {
    # TODO: using a utils/auth before getSingleUser
    getSingleUser(id: ID, username: String): User
  }

  type Mutation: {
    createUser(username: String!, email: String!, password: String!): User
    # TODO: Can arguments be separated on different lines?
    saveBook(userId: ID!, authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
    deleteBook(userId: ID!, bookId: String!): User
    login(username: String!, email: String!, password: String!): User
  } 
`;

module.exports = typeDefs;
