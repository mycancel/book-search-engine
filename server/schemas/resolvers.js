// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (parent, { userId, username }) => {
      const foundUser =  await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });
      if (!foundUser) {
        throw new AuthenticationError('Cannot find a user with this id!');
      }
      return foundUser;
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    createUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new AuthenticationError('Something is wrong!');
      }
      const token = signToken(user);
      return ({ token, user });
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, args) => {
      try {
        return await User.findOneAndUpdate(
          { _id: args.userId },
          {
            $addToSet: {
              savedBooks: {
                authors: args.authors,
                description: args.description,
                bookId: args.bookId,
                image: args.image,
                link: args.link,
                title: args.title,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Something is wrong!');
      }
    },
    // remove a book from `savedBooks`
    deleteBook: async (parent, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Couldn't find user with this id!");
      }
      return updatedUser;
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }
  
      const correctPw = await user.isCorrectPassword(body.password);
  
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user);
      return ({ token, user });
    },
  },
};

module.exports = resolvers;
