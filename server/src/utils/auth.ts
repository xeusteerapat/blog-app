import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

type User = {
  id: string;
  username: string;
  token: string;
};

export default context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = <User>jwt.verify(token, process.env.SECRET_OR_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid or Exporired Token');
      }
    }
    throw new Error("Authentication must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
