import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/addressRoutes';
import itemRoutes from './routes/itemRoutes';

import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';

const app = new Koa();
const PORT = 3020;

app.use(errorHandlingMiddleware);

app.use(cors());
app.use(bodyParser());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.use(addressRoutes.routes());
app.use(addressRoutes.allowedMethods());

app.use(itemRoutes.routes());
app.use(itemRoutes.allowedMethods());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
