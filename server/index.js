const Koa = require('koa');
const app = new Koa();
const PORT = 3020;
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const itemRoutes = require('./routes/itemRoutes');

const {
  errorHandlingMiddleware,
} = require('./middleware/errorHandlingMiddleware');

app.use(cors());
app.use(bodyParser());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.use(addressRoutes.routes());
app.use(addressRoutes.allowedMethods());

app.use(itemRoutes.routes());
app.use(itemRoutes.allowedMethods());

app.use(errorHandlingMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
