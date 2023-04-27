const mongoose = require('../db');
const bcrypt = require('bcrypt');

const userData = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('userData', userData);

//could be registration operation
const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  return newUser.save();
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
const emailExists = async (email) => {
  return await User.exists({ email });
};

const getUserById = async (userId) => {
  return User.findOne({ _id: userId });
};

module.exports = {
  createUser,
  getUserByEmail,
  emailExists,
  getUserById,
};
