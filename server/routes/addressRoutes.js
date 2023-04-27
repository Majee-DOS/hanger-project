const Router = require('koa-router');
const router = new Router();
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const controller = require('../controllers/addressController');

router.post(
  '/add-address',
  authenticationMiddleware,
  controller.registerAddress
);

router.put(
  '/update-address/:id',
  authenticationMiddleware,
  controller.updateAddress
);

module.exports = router;
