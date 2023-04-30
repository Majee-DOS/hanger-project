const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
import { Context, Next } from 'koa';

const SECRET_KEY: string =
  process.env.SECRET_KEY || 'dawgy this aint safe at aawwwll';

const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const authHeaders = ctx.headers['authorization'];
  if (!authHeaders) {
    ctx.status = 403;
    ctx.body = { error: 'No authorization header provided' };
    return;
  }

  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user: typeof User | null = await User.getUserById(_id);
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid or expired token' };
      return;
    }
    ctx.state.user = user;
    return next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
    return;
  }
};

export default authMiddleware;
