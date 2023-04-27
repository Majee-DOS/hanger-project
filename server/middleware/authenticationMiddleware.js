const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    res.sendStatus(403);
    return next();
  }

  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.getUserById(_id);
    if (!user) return res.sendStatus(401);
    req.user = user;
    return next();
  } catch (error) {
    res.sendStatus(401);
    return next(error);
  }
};

module.exports = authMiddleware;
