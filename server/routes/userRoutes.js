const Router = require('koa-router');
const router = new Router();

const controller = require('../controllers/userController');

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

module.exports = router;
