const mongoose = require('../db');

const userData = new mongoose.Schema({
  warderobe: { type: mongoose.Schema.Types.ObjectId, ref: 'itemData' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const User = mongoose.model('userData', userData);

//could be registration operation
const createUser = async (user) => {
  const newUser = await new User(user);
  newUser.save();
  return newUser;
};

const passwordMath = async (password, confirmPassword) => {
  return password === confirmPassword;
};

const emailExists = async (email) => {
  return await User.exists({ email });
};

const getUserById = async (userId) => {
  return User.findOne({ _id: userId });
};

module.exports = { createUser, emailExists, getUserById, passwordMath };
