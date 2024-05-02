import 'reflect-metadata';

import {
  Action,
  UnauthorizedError,
  createExpressServer,
} from 'routing-controllers';
import path from 'path';
import dotenv from 'dotenv-safe';
import { verify } from 'jsonwebtoken';

dotenv.config();

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [path.join(`${__dirname}/controllers/*.*`)],
  authorizationChecker: async (action: Action) => {
    try {
      const token = action.request.headers.authorization.split(' ')[1];
      if (!verify(token, process.env.JWT_SECRET_KEY as string)) {
        throw new UnauthorizedError();
      }
      return true;
    } catch {
      throw new UnauthorizedError();
    }
  },
});

// run express application on port 3000
app.listen(3000, () => {
  console.log('NODE APP - WORKS');
});
