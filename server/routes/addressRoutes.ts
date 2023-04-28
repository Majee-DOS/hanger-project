import Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import {
  registerAddress,
  updateAddress,
} from '../controllers/addressController';

import authenticationMiddleware from '../middleware/authenticationMiddleware';

const router = new Router<DefaultState, Context>();

router.post('/add-address', authenticationMiddleware, registerAddress);

router.put('/update-address/:id', authenticationMiddleware, updateAddress);

export default router;
