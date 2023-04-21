const Koa = require("koa");
const app = new Koa();
const  PORT  = 3020
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./router");

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => console.log("server is working!😀"));
