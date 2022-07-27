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

  type Query {
    #using a utils/auth before getSingleUser
    getSingleUser(id: ID!): User
  }

  type Mutation: {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, bookID: String!, authors: [String], description: String!, image: String, link: String, title: String!): User
    deleteBook(userId: ID!): User
    login(username: String!, email: String!): User
  } 
`;

module.exports = typeDefs;
