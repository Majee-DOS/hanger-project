const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';
const User = require('../models/userModel');

const authMiddleware = async (ctx, next) => {
  const authHeaders = ctx.headers['authorization'];
  if (!authHeaders) {
    ctx.status = 403;
    return next();
  }

  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.getUserById(_id);
    if (!user) {
      ctx.status = 401;
      return;
    }
    ctx.state.user = user;
    return next();
  } catch (error) {
    ctx.status = 401;
    return next(error);
  }
};

module.exports = authMiddleware;
