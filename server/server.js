const Koa = require("koa");
const app = new Koa();
const PORT = 3020;
const bodyParser = require("koa-bodyparser");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const router = require("./router");

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => console.log("server is working!😀"));
