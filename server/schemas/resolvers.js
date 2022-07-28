// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (parent, { userId, username }) => {
      return await User.findOne({
        $or: [{ _id: userId }, { username: username }],
      });
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return ({ token, user });
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (
      parent,
      { userId, authors, description, bookId, image, link, title }
    ) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            savedBooks: {
              authors: authors,
              description: description,
              bookId: bookId,
              image: image,
              link: link,
              title: title,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    // remove a book from `savedBooks`
    deleteBook: async (parent, { userId, bookId }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      // TODO: Call custom method .isCorrectPassword to validate password.
      const token = signToken(user);
      return ({ token, user });
    },
  },
};

module.exports = resolvers;
