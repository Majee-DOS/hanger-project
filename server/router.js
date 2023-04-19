const Router = require('koa-router')
const router = new Router();

('/home')
router.post('/login')
router.get('/profile/:user')
router.get('/:user/warderobe')

router.post('/item/upload')
router.get('/item/:id')

module.exports = router