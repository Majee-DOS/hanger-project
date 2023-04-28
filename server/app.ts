import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import {
  registerAddress,
  updateAddress,
} from './controllers/addressController';
import { loginUser, registerUser } from './controllers/userController';
import authenticationMiddleware from './middleware/authenticationMiddleware';
import {
  addItem,
  getAllItems,
  getUserItems,
  editItem,
  deleteItem,
} from './controllers/itemsController';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// Set up your routes
router.post('/register', loginUser);

router.post('/login', registerUser);

router.post('/add-address', authenticationMiddleware, registerAddress);

router.put('/update-address/:id', authenticationMiddleware, updateAddress);

router.post('/add-item', authenticationMiddleware, addItem);

router.get('/get-items', authenticationMiddleware, getAllItems);

router.get('/user-items/:id', authenticationMiddleware, getUserItems);

router.put('/update-item/:id', authenticationMiddleware, editItem);

router.delete('/delete-item/:id', authenticationMiddleware, deleteItem);

app.use(router.routes()).use(router.allowedMethods());

export { app };
