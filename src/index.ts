import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import path from 'path';
import dotenv from 'dotenv-safe';

dotenv.config();

// this shim is required

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [path.join(`${__dirname}/controllers/*.ts`)],
});

// run express application on port 3000
app.listen(3000, () => {
  console.log('NODE APP - WORKS');
});
