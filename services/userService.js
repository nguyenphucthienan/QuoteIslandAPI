const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById({ _id })
    .populate('roles')
    .exec();
};

exports.getUserByUsername = username => (
  User.findOne({ username })
    .populate('roles')
    .exec()
);

exports.createUser = (username, password, firstName, lastName) => {
  const newUser = new User({
    username,
    password,
    firstName,
    lastName
  });

  return newUser.save();
};

exports.generateTokenForUser = (user) => {
  const roles = user.roles.map(role => role.name);
  return jwt.sign(
    { id: user.id, role: roles },
    config.secretKey,
    { expiresIn: config.token.expirationTime }
  );
};
