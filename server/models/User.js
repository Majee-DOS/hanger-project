const User = require("../db");

exports.createUser = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

exports.loginUser = async ({ userName, password }) => {
  return User.findOne({ userName, password });
};


