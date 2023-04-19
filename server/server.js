const Koa = require('koa')
const app = new Koa();
const {PORT} = require('./config')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const router = require('./router')

app.use(cors())
app.use(bodyParser())
app.use(router.routes())


app.listen(PORT, () => console.log("server working!😀"))