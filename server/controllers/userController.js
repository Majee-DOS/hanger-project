const model = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';

const loginUser = async (ctx, next) => {
  try {
    const user = await model.getUserByEmail(ctx.request.body.email);

    if (
      user &&
      (await bcrypt.compare(ctx.request.body.password, user.password))
    ) {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      ctx.status = 200;
      ctx.body = {
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: 'Login failed',
      };
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (ctx, next) => {
  try {
    const existingEmail = await model.emailExists(ctx.request.body.email);
    const matchingPassword = await model.passwordMatch(
      ctx.request.body.password,
      ctx.request.body.confirmPassword
    );
    if (existingEmail) {
      ctx.status = 400;
      ctx.body = { message: 'Email already in use' };
    } else if (!matchingPassword) {
      ctx.status = 400;
      ctx.body = { message: 'Passwords do not match' };
    } else {
      const createUser = await model.createUser(ctx.request.body);
      ctx.status = 201;
      ctx.body = createUser;
    }
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

module.exports = { loginUser, registerUser };
