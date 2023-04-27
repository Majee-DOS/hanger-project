const Router = require('koa-router');
const router = new Router();
const controller = require('../controllers/itemsController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.post('/add-item', authenticationMiddleware, controller.addItem);

router.get('/get-items', authenticationMiddleware, controller.getAllItems);

router.get(
  '/user-items/:id',
  authenticationMiddleware,
  controller.getUserItems
);

router.put('/update-item/:id', authenticationMiddleware, controller.editItem);

router.delete(
  '/delete-item/:id',
  authenticationMiddleware,
  controller.deleteItem
);

module.exports = router;
